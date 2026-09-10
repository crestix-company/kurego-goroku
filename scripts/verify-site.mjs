import assert from 'node:assert/strict';

const origin = process.argv[2];
assert(origin, 'Usage: node scripts/verify-site.mjs <origin>');
const root = new URL('/', origin);
const response = await fetch(root);
assert.equal(response.status, 200, 'Root must return 200');
const html = await response.text();
const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
assert.match(visible, /<html[^>]+lang="ja"/);
assert.match(visible, /<title>[^<]*紅 五-五六/);
assert.equal((visible.match(/<h1\b/g) || []).length, 1);
for (const text of ['今宵も、', '旬と一献。', '三浦半島の旬を、', 'WEBでお席を予約する', 'テイクアウトのみ', '090-6495-0556', '神奈川県横須賀市深田台36', '17:30〜22:00', '公式Instagramを見る']) {
  assert(visible.includes(text), 'Missing site content: ' + text);
}
assert(!/Welcome to|Get started by editing|__next_error__|Internal Server Error/.test(visible), 'Starter/error page detected');
const links = [...visible.matchAll(/href="([^"]+)"/g)].map(match => match[1].replaceAll('&amp;', '&'));
assert(links.some(url => url === 'https://v2.rsv-crane.jp/reservation-form?manager_code=q6q7'), 'Reservation URL must stay exact');
assert(links.filter(url => url === 'https://www.instagram.com/kure_5562023/').length >= 5, 'Instagram navigation missing');
const ids = new Set([...visible.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
for (const link of links.filter(link => link.startsWith('#'))) assert(ids.has(link.slice(1)), 'Broken anchor: ' + link);
const images = [...visible.matchAll(/<img\b[^>]*>/g)].map(match => match[0]);
assert(images.length >= 10, 'Restaurant images missing');
for (const img of images) assert(/alt="[^"]+"/.test(img), 'Image alt text missing');
const paths = new Set();
for (const match of visible.matchAll(/(?:src|href)="([^"]+)"/g)) {
  if (match[1].startsWith('/') && !match[1].startsWith('//')) paths.add(match[1].replaceAll('&amp;', '&'));
}
for (const match of visible.matchAll(/srcSet="([^"]+)"/gi)) {
  for (const candidate of match[1].split(',')) paths.add(candidate.trim().split(/\s+/)[0]);
}
let assets = 0;
for (const path of paths) {
  if (path === '/') continue;
  const asset = await fetch(new URL(path, root));
  assert.equal(asset.status, 200, 'Asset failed: ' + path);
  const body = await asset.arrayBuffer();
  assert(body.byteLength > 0, 'Empty asset: ' + path);
  if (/\.(webp|png)(\?|$)/.test(path)) assert.match(asset.headers.get('content-type') || '', /^image\//, 'Wrong image content type: ' + path);
  assets++;
}
const missing = await fetch(new URL('/__release-check-not-a-page', root));
assert.equal(missing.status, 404, 'Missing route should return 404');
console.log('PASS: restaurant content, reservations, Instagram, anchors, ' + assets + ' assets, and real 404 response.');
