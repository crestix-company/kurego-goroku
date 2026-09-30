// Optional asset preparation only; committed WebP files are used by every build.
// Resizing/encoding preserves the real photos; no generative or sharpening edits.
import { resolve } from 'node:path';
import { mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import sharp from 'sharp';

assert(process.argv[2], 'Usage: node scripts/prepare-sake-photos.mjs <source-folder>');
const source = resolve(process.argv[2]);
const destination = resolve('public/images');
const files = [
  ['sake-zaku', '164021 (1)'],
  ['sake-zaku-counter', '164022'],
  ['sake-w', '164024'],
  ['sake-true-white', '164027'],
  ['sake-toumi', '164028'],
  ['sake-seijitsu', '164030'],
  ['sake-soraumi', '164032'],
  ['sake-itaru', '164033'],
  ['sake-hassen', '164034'],
  ['sake-kakurei-purple', '164036'],
  ['sake-mogura-abe', '164037'],
  ['sake-selection', '164040'],
  ['sake-kakurei-white', '164042'],
  ['sake-hanamura', '164044'],
];
await mkdir(destination, { recursive: true });
for (const [name, suffix] of files) {
  const original = resolve(source, `line_oa_chat_260930_${suffix}.jpg`);
  for (const [variant, width] of [['-small', 600], ['-medium', 1000], ['', 1500]]) {
    const output = await sharp(original)
      .autoOrient()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 92, effort: 6 })
      .toFile(resolve(destination, `${name}${variant}.webp`));
    console.log(`${name}${variant}: ${output.width}×${output.height}, ${Math.round(output.size / 1024)} KB`);
  }
}
