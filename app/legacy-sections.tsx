'use client';
import { pageUrl } from '@/lib/site-url';
import { useEffect } from 'react';
const previousSections: Record<string, string> = {
  '#about': '/about',
  '#food': '/food',
  '#drink': '/drink',
  '#takeout': '/food#takeout',
  '#space': '/about#space',
  '#access': '/access',
  '#reservation': '/access#reservation',
};
export function LegacySections() {
  useEffect(() => {
    const follow = () => {
      const destination = previousSections[window.location.hash];
      if (destination) window.location.replace(pageUrl(destination));
    };
    follow();
    window.addEventListener('hashchange', follow);
    return () => window.removeEventListener('hashchange', follow);
  }, []);
  return null;
}
