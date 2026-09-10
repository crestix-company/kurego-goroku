import { copyFile, mkdir, stat, rename } from 'node:fs/promises';
import assert from 'node:assert/strict';

// Vinext nests generated assets under assetPrefix. GitHub already mounts the
// artifact at /kurego-goroku, so remove that extra filesystem nesting once.
const nestedAssets = 'dist/client/kurego-goroku/_next';
if (await stat(nestedAssets).then(() => true, () => false)) {
  await rename(nestedAssets, 'dist/client/_next');
}

// The pinned Vinext exporter writes /food.html. GitHub Pages serves directory
// indexes for /food/, so keep the original and add an identical directory index.
for (const page of ['about', 'food', 'drink', 'access']) {
  const source = `dist/client/${page}.html`;
  assert((await stat(source)).size > 0, 'Static page was not generated: ' + source);
  await mkdir(`dist/client/${page}`, { recursive: true });
  await copyFile(source, `dist/client/${page}/index.html`);
}
for (const path of ['index.html', '404.html', 'icon.png', '.nojekyll']) await stat(`dist/client/${path}`);
console.log('Prepared all five static pages with directory indexes for GitHub Pages.');
