import { canonicalUrl } from '@/lib/site-url';
export const dynamic = 'force-static';
import type { Metadata } from 'next';
import { SiteFrame, PageHero, NextPage } from '../site';
import { FoodSection, TakeoutSection } from '../sections';
export const metadata: Metadata = {
  title: 'お料理・お品書き',
  description:
    '紅 五-五六の地魚のお造り、揚げ物、一品料理、焼き物のお品書き。火・水・土曜のランチはフィッシュバーガーのテイクアウトのみです。',
  alternates: { canonical: canonicalUrl('/food') },
};
export default function FoodPage() {
  return (
    <SiteFrame path="/food">
      <PageHero
        label="お料理"
        english="SEASONAL DISHES"
        number="02"
        title={
          <>
            今日の魚を、
            <br />
            今日のごちそうに。
          </>
        }
        description={
          <>
            三浦半島の地魚を中心に、
            <br />
            お酒と愉しむ季節の一皿をご用意します。
          </>
        }
        photo="hero"
        alt="旬の地魚のお造り"
        tone="ink"
      />
      <nav className="page-jump-links" aria-label="お料理ページの内容">
        <a href="#menu">
          夜のお料理・お品書き<span>↓</span>
        </a>
        <a href="#takeout">
          昼のテイクアウト<span>↓</span>
        </a>
      </nav>
      <FoodSection />
      <div className="takeout-page-wrap">
        <TakeoutSection />
      </div>
      <NextPage href="/drink" label="お料理に合わせる一杯を" english="DRINKS" />
    </SiteFrame>
  );
}
