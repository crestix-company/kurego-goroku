import { pageUrl, canonicalUrl } from '@/lib/site-url';
export const dynamic = 'force-static';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { SiteFrame, Photo, reservation, external } from './site';
import { InstagramSection } from './sections';
import { LegacySections } from './legacy-sections';
export const metadata = { alternates: { canonical: canonicalUrl('/') } };
export default function Home() {
  return (
    <SiteFrame path="/">
      <LegacySections />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-visual">
          <Photo
            name="hero"
            alt="三浦半島の旬の地魚を盛り込んだ紅 五-五六のお造り"
            priority
            sizes="(max-width: 640px) 100vw, 72vw"
          />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">横須賀・三浦半島の地魚と日本酒</p>
          <h1 id="hero-title">
            <span>今宵も、</span>
            <span>旬と一献。</span>
          </h1>
          <p className="hero-description">
            旨い魚と、旨い酒。
            <br />
            今日だけの一皿に出会う、小さな一軒。
          </p>
          <a className="text-link light" href={reservation} {...external}>
            お席を予約する
            <ArrowUpRight size={20} />
          </a>
        </div>
        <div className="hero-bottom">
          <span>KURE GO-GOROKU</span>
          <a href="#discover">
            紅 五-五六を知る
            <ArrowDown size={16} />
          </a>
          <span>四季酒肴・地魚</span>
        </div>
      </section>
      <div className="welcome-strip">
        <p>横須賀中央駅 徒歩3分</p>
        <span aria-hidden="true">／</span>
        <p>カウンター4席・テーブル8席</p>
        <span aria-hidden="true">／</span>
        <p>日曜定休</p>
      </div>
      <section className="home-introduction section-pad" id="discover">
        <div>
          <p className="section-label">四季酒肴 地魚 — 紅 五-五六</p>
          <h2>
            この街で、
            <br />
            旬と出会う。
          </h2>
        </div>
        <div>
          <p>
            三浦半島の旬を、一番おいしい食べ方で。
            <br />
            その日の地魚と、料理に寄り添う日本酒。
            <br />
            全12席の小さな一軒で、肩の力を抜いて。
          </p>
          <a className="text-link" href={pageUrl('/about')}>
            紅 五-五六について
            <ArrowRight size={21} />
          </a>
        </div>
      </section>
      <section className="home-chapters" aria-label="お料理とお飲み物">
        <a className="chapter-card" href={pageUrl('/food')}>
          <Photo
            name="sashimi"
            alt="旬の地魚のお造り"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
          <div>
            <span className="chapter-number">01 / DISHES</span>
            <h2>地魚を、味わう。</h2>
            <p>お造りから、一品料理まで。</p>
            <span className="chapter-link">
              お料理・お品書き
              <ArrowRight size={25} />
            </span>
          </div>
        </a>
        <a className="chapter-card chapter-sake" href={pageUrl('/drink')}>
          <Photo
            name="sake"
            alt="お料理と合わせる日本酒"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
          <div>
            <span className="chapter-number">02 / DRINKS</span>
            <h2>一杯を、愉しむ。</h2>
            <p>季節の日本酒と、気の合う時間。</p>
            <span className="chapter-link">
              お飲み物・お品書き
              <ArrowRight size={25} />
            </span>
          </div>
        </a>
      </section>
      <section className="home-guide section-pad" aria-label="ご来店案内">
        <a className="takeout-teaser" href={pageUrl('/food#takeout')}>
          <Photo
            name="burger"
            alt="テイクアウトの地魚バーガー"
            sizes="(max-width: 640px) 35vw, 20vw"
          />
          <div>
            <p className="section-label">火・水・土のお昼は</p>
            <h2>
              地魚バーガーを、
              <br />
              お持ち帰りで。
            </h2>
            <span className="text-link">
              テイクアウトのご案内
              <ArrowRight size={19} />
            </span>
          </div>
        </a>
        <a className="access-teaser" href={pageUrl('/access')}>
          <p className="section-label">VISIT US</p>
          <h2>今夜は、紅へ。</h2>
          <p>
            横須賀中央駅より徒歩3分。
            <br />
            営業時間・アクセスはこちら。
          </p>
          <span className="text-link">
            店舗案内・ご予約
            <ArrowRight size={19} />
          </span>
        </a>
      </section>
      <InstagramSection />
    </SiteFrame>
  );
}
