import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import ts from 'typescript';

const source = await readFile(
  new URL('../app/motion.tsx', import.meta.url),
  'utf8',
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;

function environment({ reduced = false, support = true } = {}) {
  class Element {
    constructor(top) {
      this.top = top;
      this.dataset = {};
      this.values = new Map();
      this.style = {
        setProperty: (key, value) => this.values.set(key, value),
        removeProperty: (key) => this.values.delete(key),
      };
    }
    getBoundingClientRect() {
      return { top: this.top };
    }
    closest() {
      return this.dataset.reveal === 'pending' ? this : null;
    }
  }
  const elements = [new Element(100), new Element(1000), new Element(1800)];
  for (const element of elements)
    element.parentElement = { children: elements };
  const documentEvents = new Map();
  const preferenceEvents = new Map();
  const observed = new Set();
  let callback;
  let cleanup;
  let disconnected = false;
  class Observer {
    constructor(cb, options) {
      callback = cb;
      assert(options.threshold > 0 && options.threshold < 0.1);
    }
    observe(element) {
      observed.add(element);
    }
    unobserve(element) {
      observed.delete(element);
    }
    disconnect() {
      observed.clear();
      disconnected = true;
    }
  }
  const window = {
    innerHeight: 800,
    matchMedia: () => ({
      matches: reduced,
      addEventListener: (name, fn) => preferenceEvents.set(name, fn),
      removeEventListener: (name) => preferenceEvents.delete(name),
    }),
  };
  if (support) window.IntersectionObserver = Observer;
  const document = {
    querySelectorAll: () => elements,
    addEventListener: (name, fn) => documentEvents.set(name, fn),
    removeEventListener: (name) => documentEvents.delete(name),
  };
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    require: (name) => {
      assert.equal(name, 'react');
      return {
        useEffect: (effect) => {
          cleanup = effect();
        },
      };
    },
    window,
    document,
    Element,
    IntersectionObserver: Observer,
  });
  exports.MotionEffects();
  return {
    elements,
    observed,
    documentEvents,
    preferenceEvents,
    enter: (target, isIntersecting = true) =>
      callback([{ target, isIntersecting }]),
    cleanup: () => cleanup?.(),
    disconnected: () => disconnected,
  };
}

for (const options of [{ reduced: true }, { support: false }]) {
  const env = environment(options);
  assert(
    env.elements.every((element) => !element.dataset.reveal),
    'Reduced motion/unsupported observer must leave content visible',
  );
  assert.equal(env.observed.size, 0);
}
const env = environment();
const [visible, below, focused] = env.elements;
assert.equal(
  visible.dataset.reveal,
  undefined,
  'Already visible content must never be hidden',
);
assert.equal(below.dataset.reveal, 'pending');
assert.equal(focused.dataset.reveal, 'pending');
assert.equal(env.observed.size, 2);
assert.equal(
  focused.values.get('--reveal-delay'),
  '160ms',
  'Stagger delay must be capped',
);
env.enter(below, false);
assert.equal(below.dataset.reveal, 'pending');
env.enter(below);
assert.equal(below.dataset.reveal, 'visible');
assert(!env.observed.has(below), 'Reveals should play once');
env.documentEvents.get('focusin')({ target: focused });
assert.equal(
  focused.dataset.reveal,
  'visible',
  'Keyboard focus must reveal immediately',
);
assert.equal(focused.values.get('--reveal-delay'), '0ms');
env.cleanup();
assert(env.disconnected());
assert.equal(env.documentEvents.size, 0);
assert.equal(env.preferenceEvents.size, 0);
assert(
  env.elements.every(
    (element) => !element.dataset.reveal && element.values.size === 0,
  ),
);
const changed = environment();
changed.preferenceEvents.get('change')();
assert(
  changed.elements.every((element) => !element.dataset.reveal),
  'Changed motion preference must restore all content',
);
assert(changed.disconnected());
const css = await readFile(
  new URL('../app/motion.css', import.meta.url),
  'utf8',
);
assert(css.replace(/\s/g, '').includes('@media(prefers-reduced-motion:reduce)'));
assert(css.includes('@media print'));
assert(
  !/filter\s*:|backdrop-filter\s*:/.test(css),
  'Photo animations must not blur images',
);
assert(
  css.replace(/\s/g, '').includes('@media(hover:hover)and(pointer:fine)'),
  'Hover motion should be restricted to suitable pointers',
);
console.log(
  'PASS: reduced motion, fallback visibility, viewport protection, one-time reveal, capped stagger, keyboard focus, cleanup, preference changes, and print visibility.',
);
