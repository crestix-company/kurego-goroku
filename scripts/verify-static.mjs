import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { startStaticServer } from './static-server.mjs';

for (const file of ['index.html', 'about/index.html', 'food/index.html', 'drink/index.html', 'access/index.html', '404.html', '.nojekyll']) {
  const info = await stat('dist/client/' + file);
  assert(info.isFile() && (info.size > 0 || file === '.nojekyll'), 'Missing static artifact: ' + file);
}
const index = JSON.parse(await readFile('dist/server/vinext-prerender.json', 'utf8'));
for (const route of ['/', '/about', '/food', '/drink', '/access']) assert(index.routes.some(entry => entry.route === route && entry.status === 'rendered'), 'Route not exported: ' + route);
const { server, url } = await startStaticServer('dist/client');
try {
  const { stdout } = await promisify(execFile)(process.execPath, ['scripts/verify-site.mjs', url]);
  console.log(stdout.trim());
} finally { await new Promise(done => server.close(done)); }
