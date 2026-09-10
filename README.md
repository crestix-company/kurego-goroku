# 四季酒肴 地魚 紅 五-五六

横須賀中央の地魚と日本酒のお店「紅 五-五六」のWebサイト。

**ホームページはこちら:** https://crestix-company.github.io/kurego-goroku/

GitHubのリポジトリ画面はソースコードの保管場所です。実際のホームページは上記のGitHub Pages URLで開いてください。

## 制作内容

- 店舗紹介、料理、日本酒、ランチのテイクアウト、店内、Instagram、営業時間・予約案内。
- 店舗指定の予約システムへ直接遷移。問い合わせフォームや未承認の予約受付機能は設けていません。
- 写真は提供Driveの元解像度データと既存公式サイトの店舗写真を使用。生成した料理や店内写真は使っていません。
- 写真はWebP、レスポンシブ配信、ファーストビュー以外の遅延読み込みに対応。
- Instagramは公式アカウントへのリンクです。自動反映・API連携は行っていません。

## ページ構成

- `/`：トップ。お店の魅力と各ページへの入口、Instagram。
- `/about`：お店の考え方、料理への姿勢、店内と席数。
- `/food`：料理の写真、全16品のお品書き、ランチのテイクアウト。
- `/drink`：日本酒の紹介、全9項目のお飲み物のお品書き。
- `/access`：営業時間、アクセス、店舗情報、ご予約。

各ページにメインメニュー・現在位置・予約導線を設置しています。
旧URLの `/#drink` などは対応する独立ページへ移動します。
写真・掲載価格・予約先・Instagramの遷移先は変更していません。

## 動きの設計

見出しと写真のゆっくりした登場、スクロールに応じた一度だけの表示、控えめなボタン・写真の反応を実装しています。スクロール速度を変えたり、写真をぼかす処理はありません。追加のアニメーションライブラリは使用していません。
OSの「視差効果を減らす」に対応し、JavaScriptが無効でも本文は読めます。キーボードで移動した要素はすぐに表示します。

## 確認・起動

- インストール: `npm ci`
- 開発: `npm run dev -- --port 4194`
- 型チェック: `npx tsc --noEmit`
- 動きの動作検証: `node scripts/test-motion.mjs`
- ビルド: `npm run build`
- 本番成果物のローカル起動: `npm run start -- --port 4195`
- HTTP検証: `node scripts/verify-site.mjs http://localhost:4195`

検証では本番成果物の5ページを直接読み込み、各ページの固有内容・見出し・メニュー価格・画像・内部リンク・予約先と、存在しないURLの404応答を確認します。
非公開のSites確認時のみ、必要に応じて `SITES_VERIFY_TOKEN` を一時環境変数で渡せます。認証情報は指定ホスト以外へ送信せず、ファイルには保存しません。

## 公開先

### GitHub Pages

`main` へプッシュすると `.github/workflows/pages.yml` が検証・ビルド・公開を実行します。

- GitHub Settings → Pages → Source：**GitHub Actions**
- ビルド：`npm run build:github-pages`
- 公開する成果物：`dist/client`（5ページのHTML・画像・CSS・JavaScript）
- 公開前検証：`node scripts/verify-static.mjs`
- 公開後検証：`node scripts/verify-site.mjs https://crestix-company.github.io/kurego-goroku/`

公開前検証では実際の `/kurego-goroku/` 配下で静的ファイルを配信し、全ページ・料金・予約リンク・画像とCSS/JavaScriptを確認します。静的HTMLが揃わなければ公開は進みません。依存アクションは検証済みコミットに固定しています。

### 既存のSites確認用サイト

従来の `npm run build` はSites向けCloudflare Workerビルドを維持しています。
`.openai/hosting.json` の登録済みSiteを再利用してください。GitHubへプッシュするだけでは、この確認用URLは更新されません。

**Cloudflare Pagesの出力ディレクトリとして、このWorkerビルドを指定しないでください。**
GitHub向けビルドには `/kurego-goroku/` のパスが含まれるため、Cloudflare Pagesへそのまま流用せず、ルート公開用にパス設定を変更して再検証してください。

## 情報管理

`CONTENT-SOURCES.md` に出典と確認日を記載しています。
営業時間はヒアリングシート、メニュー例の価格は既存公式サイトを優先しています。
営業時間・メニュー・価格の変更時は本文と検証スクリプトを合わせて更新してください。
