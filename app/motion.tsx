'use client';

import { useEffect } from 'react';

const revealSelector = [
  '.home-introduction > div',
  '.chapter-card',
  '.takeout-teaser',
  '.access-teaser',
  '.section-heading > *',
  '.food-gallery > article',
  '.menu-wrap',
  '.takeout-visual',
  '.takeout-copy',
  '.story-heading',
  '.story-chapters > article',
  '.story-detail',
  '.space-photos > figure',
  '.instagram-photos > a',
  '.drink-story > div',
  '.drinks-catalog > div',
  '.access-title',
  '.hours',
  '.access-takeout-note',
  '.reservation-section > div',
  '.next-page',
].join(',');

// Content stays visible in the server response and without JavaScript.
// Only below-the-fold elements are enhanced after the observer is ready.
export function MotionEffects() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !('IntersectionObserver' in window)) return;
    const elements = [
      ...document.querySelectorAll<HTMLElement>(revealSelector),
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          element.dataset.reveal = 'visible';
          observer.unobserve(element);
        }
      },
      { threshold: 0.04, rootMargin: '0px 0px -24px 0px' },
    );

    for (const element of elements) {
      // Never hide content already in view, including direct section links.
      if (element.getBoundingClientRect().top < window.innerHeight) continue;
      const siblings = element.parentElement
        ? [...element.parentElement.children]
        : [];
      const index = Math.min(Math.max(siblings.indexOf(element), 0), 2);
      element.style.setProperty('--reveal-delay', `${index * 80}ms`);
      element.dataset.reveal = 'pending';
      observer.observe(element);
    }
    const revealFocused = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>(
        '[data-reveal="pending"]',
      );
      if (element) {
        element.style.setProperty('--reveal-delay', '0ms');
        element.dataset.reveal = 'visible';
        observer.unobserve(element);
      }
    };
    const clear = () => {
      observer.disconnect();
      for (const element of elements) {
        delete element.dataset.reveal;
        element.style.removeProperty('--reveal-delay');
      }
    };
    document.addEventListener('focusin', revealFocused);
    preference.addEventListener('change', clear);
    return () => {
      clear();
      document.removeEventListener('focusin', revealFocused);
      preference.removeEventListener('change', clear);
    };
  }, []);
  return null;
}
