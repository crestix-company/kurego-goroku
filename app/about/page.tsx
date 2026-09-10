import { canonicalUrl } from '@/lib/site-url';
export const dynamic = 'force-static';
import type { Metadata } from 'next';
import { SiteFrame, PageHero, Photo, NextPage } from '../site';
import { SpaceSection } from '../sections';
export const metadata: Metadata = {
  title: 'お店について',
  description:
    '三浦半島の地魚を、その魚に合う一皿へ。紅 五-五六の料理への思いと、カウンター4席・テーブル8席の温かな店内をご紹介します。',
  alternates: { canonical: canonicalUrl('/about') },
};
export default function AboutPage() {
  return (
    <SiteFrame path="/about">
      <PageHero
        label="お店について"
        english="OUR STORY"
        number="01"
        title={
          <>
            三浦の海から、
            <br />
            この街の一軒へ。
          </>
        }
        description={
          <>
            その日の魚と、料理人のひと手間。
            <br />
            気取らず味わう、紅 五-五六の時間。
          </>
        }
        photo="fresh"
        alt="三浦半島で水揚げされた地魚"
        tone="paper"
      />
      <section className="about-story section-pad">
        <div className="story-heading">
          <p className="section-label">大切にしていること</p>
          <h2>
            旬を選び、
            <br />
            手をかける。
          </h2>
          <p>
            変わらないのは、魚と向き合う姿勢。
            <br />
            変わるのは、その日の献立。
          </p>
        </div>
        <div className="story-chapters">
          <article>
            <span>一</span>
            <div>
              <h3>その日の海を、いただく。</h3>
              <p>
                信頼する仲卸から届く、三浦半島の地魚。漁や季節によって、並ぶ魚は日々変わります。つりあじをはじめ、そのときに出会えるおいしさを大切にしています。
              </p>
            </div>
          </article>
          <article>
            <span>二</span>
            <div>
              <h3>魚に合わせて、仕立てる。</h3>
              <p>
                料理人歴20年以上の店主が、一尾ずつ見極めて。お造り、焼き物、煮付け、揚げ物。その魚がいちばんおいしくなる食べ方で、一皿に仕立てます。
              </p>
            </div>
          </article>
          <article>
            <span>三</span>
            <div>
              <h3>旬の隣に、旨い酒。</h3>
              <p>
                日本酒は、魚料理に合わせて選んだものを。季節ごとに変わる銘柄から、お料理やお好みに合う一杯をご案内します。迷ったときも、どうぞお気軽に。
              </p>
            </div>
          </article>
        </div>
      </section>
      <figure className="story-detail">
        <Photo
          name="sashimi"
          alt="その日の地魚を盛り合わせたお造り"
          sizes="(max-width: 640px) 90vw, 65vw"
        />
        <figcaption>その日、その魚だからこその一皿。</figcaption>
      </figure>
      <SpaceSection />
      <NextPage href="/food" label="旬のお料理をみる" english="DISHES" />
    </SiteFrame>
  );
}
