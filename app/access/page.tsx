import { pageUrl, canonicalUrl } from '@/lib/site-url';
export const dynamic = 'force-static';
import type { Metadata } from 'next';
import { SiteFrame, PageHero } from '../site';
import { AccessSection } from '../sections';
export const metadata: Metadata = {
  title: '店舗案内・ご予約',
  description:
    '神奈川県横須賀市深田台36、横須賀中央駅徒歩3分。紅 五-五六の営業時間・定休日・アクセス・WEB予約・電話予約のご案内です。',
  alternates: { canonical: canonicalUrl('/access') },
};
export default function AccessPage() {
  return (
    <SiteFrame path="/access">
      <PageHero
        label="店舗案内・ご予約"
        english="VISIT US"
        number="04"
        title={
          <>
            暖簾の向こうで、
            <br />
            お待ちしています。
          </>
        }
        description={
          <>
            京急線 横須賀中央駅より徒歩3分。
            <br />
            一人の夜も、親しい人とのひとときも。
          </>
        }
        photo="interior"
        alt="全12席の紅 五-五六の店内"
        tone="paper"
      />
      <nav className="page-jump-links" aria-label="店舗案内ページの内容">
        <a href="#access">
          アクセス・営業時間<span>↓</span>
        </a>
        <a href="#reservation">
          WEB・電話でご予約<span>↓</span>
        </a>
      </nav>
      <AccessSection />
      <div className="access-takeout-note">
        <p>
          <strong>お昼のご利用について</strong>
          <span>
            火・水・土曜日はフィッシュバーガーのテイクアウトのみです。
          </span>
        </p>
        <a href={pageUrl('/food#takeout')}>テイクアウトのご案内 →</a>
      </div>
    </SiteFrame>
  );
}
