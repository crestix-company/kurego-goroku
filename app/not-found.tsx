import { pageUrl } from '@/lib/site-url';
import { SiteFrame } from './site';
export default function NotFound() {
  return (
    <SiteFrame path="">
      <section className="not-found section-pad">
        <p className="section-label">404 — PAGE NOT FOUND</p>
        <h1>ページが見つかりませんでした。</h1>
        <p>お探しの内容は、上のメニューまたはトップページからご覧ください。</p>
        <a className="button" href={pageUrl('/')}>
          トップページへ戻る →
        </a>
      </section>
    </SiteFrame>
  );
}
