import assert from 'node:assert/strict';

const origin = process.argv[2];
assert(origin, 'Usage: node scripts/verify-site.mjs <origin>');
const root = new URL(origin.endsWith('/') ? origin : origin + '/');
const prefix = root.pathname.replace(/\/$/, '');
const pagePath = path => prefix + path + (prefix && path !== '/' ? '/' : '');
const routePath = pathname => {
  assert(pathname.startsWith(prefix + '/'), 'Link escaped the deployment base path: ' + pathname);
  return pathname.slice(prefix.length).replace(/\/$/, '') || '/';
};
const reservation =
  'https://v2.rsv-crane.jp/reservation-form?manager_code=q6q7';
const instagram = 'https://www.instagram.com/kure_5562023/';
const routes = {
  '/': [
    '今宵も、',
    '旬と一献。',
    'この街で、',
    '紅 五-五六について',
    'お料理・お品書き',
    'お飲み物・お品書き',
    '公式Instagramを見る',
  ],
  '/about': [
    'お店について',
    '信頼する仲卸',
    '料理人歴20年以上',
    '全12席',
    'カウンター',
    'テーブル',
  ],
  '/food': [
    'お料理',
    '地魚・お造り・揚げ物',
    '一品料理',
    '焼き物',
    '火・水・土曜日',
    '12:00〜14:00',
    'L.O. 13:30',
    'お昼はテイクアウトのみ',
    '仕入れ状況',
    '閉店1時間前',
  ],
  '/drink': [
    'お飲み物',
    '日本酒',
    'ビール',
    '焼酎',
    'ソフトドリンク',
    '表示価格は税込',
  ],
  '/access': [
    '店舗案内・ご予約',
    '神奈川県横須賀市深田台36',
    '横須賀中央駅より徒歩3分',
    '木曜日',
    '17:30〜22:00',
    '金・土曜日',
    '17:00〜23:00',
    '定休日',
    'テイクアウトのみ',
    '現金のみ',
    '専用駐車場はございません',
  ],
};
const foodPrices = [
  ['釣りあじ', '900'],
  ['いさき', '800'],
  ['たこ（店内仕上げ）', '880'],
  ['地あじフライ', '900'],
  ['地魚白身フライ', '800'],
  ['地魚南蛮漬け', '650'],
  ['自家製ポテトサラダ', '700'],
  ['クリームチーズおかかくるみ和え', '800'],
  ['もつ煮込み', '700'],
  ['鶏皮ぽん酢', '580'],
  ['あさりのチャンジャ', '550'],
  ['つぶ貝わさび', '550'],
  ['極上豚バラ', '380'],
  ['極上鶏レバー（信玄どり）', '300'],
  ['極上鶏ハツ（信玄どり）', '300'],
  ['極上鶏皮', '280'],
];
const drinkPrices = [
  ['日本酒（至・春霞など）', '880〜'],
  ['サッポロ黒ラベル 樽生', '680'],
  ['サッポロラガー 中瓶', '700'],
  ['デュワーズ ホワイトラベル', '600'],
  ['濃いめのレモンサワー', '550'],
  ['男梅サワー', '550'],
  ['焼酎（村正・回展）', '600'],
  ['梅酒', '630〜'],
  ['ソフトドリンク', '380〜'],
];
const cleanText = (html) =>
  html
    .replace(/<[^>]+>/g, '')
    .replaceAll('&amp;', '&')
    .replace(/\s+/g, ' ')
    .trim();
const attribute = (tag, name) =>
  tag
    .match(new RegExp('\\b' + name + '="([^"]*)"', 'i'))?.[1]
    .replaceAll('&amp;', '&');

// The optional private Sites credential is restricted to this origin.
async function request(path) {
  const url = new URL(path, root);
  assert.equal(
    url.origin,
    root.origin,
    'Never forward site credentials off-origin',
  );
  const headers = process.env.SITES_VERIFY_TOKEN
    ? { 'OAI-Sites-Authorization': 'Bearer ' + process.env.SITES_VERIFY_TOKEN }
    : {};
  return fetch(url, {
    headers,
    redirect: 'manual',
    signal: AbortSignal.timeout(20000),
  });
}
const pages = new Map();
const titles = new Set();
const assets = new Set();
for (const [path, content] of Object.entries(routes)) {
  const response = await request(pagePath(path));
  assert.equal(response.status, 200, path + ' must return 200');
  assert.match(response.headers.get('content-type') || '', /text\/html/);
  const raw = await response.text();
  const html = raw.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  assert.match(html, /<html[^>]+lang="ja"/);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert(title?.includes('紅 五-五六'), 'Site-specific title missing: ' + path);
  assert(!titles.has(title), 'Duplicate page title: ' + path);
  titles.add(title);
  assert.equal(
    (html.match(/<h1\b/g) || []).length,
    1,
    'Expected one h1: ' + path,
  );
  assert(
    !/Welcome to|Get started by editing|__next_error__|Internal Server Error/.test(
      html,
    ),
    'Starter/error page: ' + path,
  );
  for (const text of [...content, 'WEBでお席を予約する', '090-6495-0556'])
    assert(
      cleanText(html).includes(text),
      'Missing ' + path + ' content: ' + text,
    );
  const anchors = [...html.matchAll(/<a\b[^>]*>/g)].map((match) => match[0]);
  const links = anchors.map((tag) => attribute(tag, 'href')).filter(Boolean);
  assert(links.includes(reservation), 'Exact reservation URL missing: ' + path);
  assert(links.includes(instagram), 'Exact Instagram URL missing: ' + path);
  for (const tag of anchors.filter((tag) =>
    [reservation, instagram].includes(attribute(tag, 'href')),
  )) {
    assert.equal(attribute(tag, 'target'), '_blank');
    assert.match(attribute(tag, 'rel') || '', /noopener/);
  }
  const nav = html.match(
    /<nav\b[^>]*aria-label="メインナビゲーション"[^>]*>([\s\S]*?)<\/nav>/,
  )?.[1];
  assert(nav, 'Main navigation missing: ' + path);
  for (const route of Object.keys(routes))
    assert(
      nav.includes('href="' + pagePath(route) + '"'),
      'Missing navigation: ' + route,
    );
  const active = [...nav.matchAll(/<a\b[^>]*aria-current="page"[^>]*>/g)];
  assert.equal(active.length, 1, 'Expected one active page: ' + path);
  assert.equal(attribute(active[0][0], 'href'), pagePath(path));
  const canonicalTag = [...html.matchAll(/<link\b[^>]*>/g)]
    .map((match) => match[0])
    .find((tag) => attribute(tag, 'rel') === 'canonical');
  assert(canonicalTag, 'Canonical missing: ' + path);
  assert.equal(new URL(attribute(canonicalTag, 'href')).pathname, pagePath(path));
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'Duplicate element ids: ' + path);
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
  assert(images.length >= 2, 'Restaurant images missing: ' + path);
  for (const img of images) {
    assert(attribute(img, 'alt'), 'Image alt text missing: ' + path);
    assert(
      Number(attribute(img, 'width')) > 0 &&
        Number(attribute(img, 'height')) > 0,
      'Image dimensions missing: ' + path,
    );
    assets.add(attribute(img, 'src'));
    const srcset = attribute(img, 'srcset');
    if (!attribute(img, 'src')?.includes('logo'))
      assert(
        srcset?.includes('-small.webp 600w'),
        'Responsive image missing: ' + path,
      );
    if (srcset)
      for (const candidate of srcset.split(','))
        assets.add(candidate.trim().split(/\s+/)[0]);
  }
  for (const tag of [...raw.matchAll(/<(?:link|script)\b[^>]*>/g)].map(
    (match) => match[0],
  )) {
    const asset = attribute(tag, 'src') || attribute(tag, 'href');
    if (asset?.startsWith('/') && /\.(?:js|css|png|webp)(?:\?|$)/.test(asset))
      assets.add(asset);
  }
  pages.set(path, { html, links, ids: new Set(ids) });
  console.log(
    'PASS ' +
      path +
      ': independent content, metadata, active navigation, reservation and images',
  );
}
for (const [path, page] of pages) {
  for (const link of page.links) {
    if (!link.startsWith('/') && !link.startsWith('#')) continue;
    const url = new URL(link, new URL(pagePath(path), root));
    if (url.origin !== root.origin) continue;
    const destination = pages.get(routePath(url.pathname));
    assert(destination, 'Unknown internal page: ' + path + ' → ' + link);
    if (url.hash)
      assert(
        destination.ids.has(decodeURIComponent(url.hash.slice(1))),
        'Broken section link: ' + path + ' → ' + link,
      );
  }
}
for (const [path, expected] of [
  ['/food', foodPrices],
  ['/drink', drinkPrices],
]) {
  const html = pages.get(path).html;
  const rows = [
    ...html.matchAll(
      /<dt\b[^>]*>([\s\S]*?)<\/dt>\s*<dd\b[^>]*>([\s\S]*?)<\/dd>/g,
    ),
  ].map((match) => [cleanText(match[1]), cleanText(match[2])]);
  for (const [name, price] of expected)
    assert(
      rows.some(
        ([actual, amount]) => actual === name && amount === price + '円',
      ),
      'Missing/incorrect menu price: ' + path + ' ' + name,
    );
  assert.equal(
    rows.length,
    expected.length,
    'Menu entry count changed: ' + path,
  );
  assert(
    !/data-slot="accordion-content"[^>]*\bhidden(?:\s|=|>)/.test(html),
    'Menu should start expanded: ' + path,
  );
}
assert(
  !pages.get('/').html.includes('class="hours-row"'),
  'Home should link to the full opening-hours page',
);
assert(
  !pages.get('/').html.includes('class="price-list"'),
  'Home should link to the independent menu pages',
);
let bytes = 0;
for (const path of assets) {
  const response = await request(path);
  assert.equal(response.status, 200, 'Asset failed: ' + path);
  const body = await response.arrayBuffer();
  assert(body.byteLength > 0, 'Empty asset: ' + path);
  if (/\.(webp|png)(\?|$)/.test(path))
    assert.match(
      response.headers.get('content-type') || '',
      /^image\//,
      'Wrong image type: ' + path,
    );
  bytes += body.byteLength;
}
const missing = await request(pagePath('/__release-check-not-a-page'));
assert.equal(missing.status, 404, 'Unknown page must return 404');
assert(
  (await missing.text()).includes('ページが見つかりませんでした。'),
  'Restaurant 404 page missing',
);
console.log(
  'PASS: all 5 routes, 16 dishes, 9 drinks, all page/section links, ' +
    assets.size +
    ' assets (' +
    Math.round(bytes / 1024) +
    ' KB), and custom 404.',
);
