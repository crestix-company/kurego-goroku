import { canonicalUrl } from '@/lib/site-url';
export const dynamic = 'force-static';
import type { Metadata } from 'next';
import { SiteFrame, PageHero, Photo, NextPage } from '../site';
import { DrinkMenu } from '../menus';
export const metadata: Metadata = {
  title: 'お飲み物・日本酒',
  description:
    '季節の日本酒を、三浦半島の地魚とともに。紅 五-五六の日本酒、ビール、焼酎、サワーなどのお飲み物をご紹介します。',
  alternates: { canonical: canonicalUrl('/drink') },
};
export default function DrinkPage() {
  return (
    <SiteFrame path="/drink">
      <PageHero
        label="お飲み物"
        english="SAKE & DRINKS"
        number="03"
        title={
          <>
            旨い魚に、
            <br />
            旨い一杯を。
          </>
        }
        description={
          <>
            季節の日本酒と、おなじみのお酒。
            <br />
            今夜のお料理に、そっと寄り添う一杯を。
          </>
        }
        photo="sake"
        alt="紅 五-五六で取り扱う日本酒の一例"
        tone="wine"
      />
      <section className="drink-story section-pad">
        <div>
          <p className="section-label">日本酒と、地魚と。</p>
          <h2>
            選ぶ楽しさも、
            <br />
            おまかせする楽しさも。
          </h2>
        </div>
        <div>
          <p>
            日本酒は、当店の魚料理に合うものを選んでいます。季節によって銘柄が変わるのも、紅
            五-五六の楽しみのひとつ。
          </p>
          <p>
            「このお造りに合わせるなら？」
            <br />
            「今日は、こんな気分なんだけど。」
          </p>
          <p>
            お料理から選んでも、お好みから選んでも。
            <br />
            おすすめの一杯は、お気軽にお尋ねください。
          </p>
        </div>
      </section>
      <section className="drinks-catalog section-pad" id="drinks-menu">
        <div className="drinks-catalog-intro">
          <p className="section-label">お飲み物のお品書き</p>
          <h2>今夜の、一杯。</h2>
          <p>
            日本酒はもちろん、ビールや焼酎、
            <br />
            サワー、ソフトドリンクもございます。
          </p>
          <figure>
            <Photo
              name="counter"
              alt="お酒が並ぶ店内のカウンター"
              sizes="(max-width: 640px) 85vw, 32vw"
            />
            <figcaption>一人の夜も、語らう夜も。</figcaption>
          </figure>
        </div>
        <div>
          <DrinkMenu expanded />
          <p className="fine-print">
            お品書きは一例です。銘柄・内容・価格は季節や仕入れにより変わる場合がございます。表示価格は税込です。
          </p>
        </div>
      </section>
      <NextPage
        href="/access"
        label="お席のご予約・店舗案内へ"
        english="VISIT & RESERVATION"
      />
    </SiteFrame>
  );
}
