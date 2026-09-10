import { ArrowUpRight, Camera, MapPin, Phone } from 'lucide-react';
import { FoodMenu } from './menus';
import { Photo, external, instagram, map } from './site';

export function FoodSection() {
  return (
    <section className="food-section section-pad dark" id="menu">
      <div className="section-heading">
        <div>
          <p className="section-label">SEASONAL DISHES</p>
          <h2>今、いちばんの味を。</h2>
        </div>
        <p>
          季節が変われば、献立も変わる。
          <br />
          地魚の持ち味を生かした一皿を、
          <br />
          その日のおすすめでお楽しみください。
        </p>
      </div>
      <div className="food-gallery">
        <article>
          <div className="food-image">
            <Photo
              name="sashimi"
              alt="地魚を中心としたお造りの盛り合わせ"
              sizes="(max-width: 640px) 82vw, 30vw"
            />
            <span>一</span>
          </div>
          <p className="english-label">SASHIMI</p>
          <h3>まずは、お造りから。</h3>
          <p>
            つりあじをはじめ、旬の地魚を。
            <br />
            魚それぞれの旨みを、まっすぐに。
          </p>
        </article>
        <article>
          <div className="food-image">
            <Photo
              name="aji"
              alt="香ばしく揚げた地あじフライ"
              sizes="(max-width: 640px) 82vw, 30vw"
            />
            <span>二</span>
          </div>
          <p className="english-label">FRIED LOCAL FISH</p>
          <h3>さっくり、ふっくら。</h3>
          <p>
            地魚ならではのおいしさをフライに。
            <br />
            お酒と合わせたい、親しみのある一品。
          </p>
        </article>
        <article>
          <div className="food-image">
            <Photo
              name="simmered"
              alt="地魚の旨みを生かした煮付け"
              sizes="(max-width: 640px) 82vw, 30vw"
            />
            <span>三</span>
          </div>
          <p className="english-label">SEASONAL DISHES</p>
          <h3>じんわり、旬を味わう。</h3>
          <p>
            煮付けも、焼き物も、その魚に合わせて。
            <br />
            箸が進む一皿に、もう一杯。
          </p>
        </article>
      </div>
      <p className="swipe-hint">
        写真は横にスワイプできます <span aria-hidden="true">→</span>
      </p>
      <div className="menu-wrap">
        <div>
          <p className="section-label">お品書き</p>
          <p>
            お料理の一例です。
            <br />
            仕入れにより内容・価格が変わる場合がございます。
            <br />
            <span className="fine-print">
              表示価格は税込です。写真は一例です。
            </span>
          </p>
        </div>
        <FoodMenu expanded />
      </div>
    </section>
  );
}

export function TakeoutSection() {
  return (
    <section className="takeout-section" id="takeout">
      <div className="takeout-visual">
        <Photo
          name="burger"
          alt="地魚のフライとタルタルソースを挟んだフィッシュバーガー"
        />
        <span className="takeout-mark">
          昼は、
          <br />
          地魚バーガー。
        </span>
      </div>
      <div className="takeout-copy">
        <p className="section-label">LUNCH — TAKE OUT ONLY</p>
        <h2>
          海のごちそうを、
          <br />
          持ち帰ろう。
        </h2>
        <p>
          地魚のおいしさを、もっと気軽に。
          <br />
          サクッと揚げた魚を挟んだ、
          <br />紅 五-五六のフィッシュバーガー。
        </p>
        <div className="takeout-hours">
          <strong>火・水・土曜日</strong>
          <span>
            12:00〜14:00 <small>（L.O. 13:30）</small>
          </span>
        </div>
        <p className="takeout-note">
          お昼はテイクアウトのみの営業です。
          <br />
          魚の仕入れ状況により、お休みとなる場合がございます。ご来店前にお電話でご確認ください。
        </p>
        <a className="text-link light" href="tel:09064950556">
          <Phone size={18} />
          電話で営業を確認する
          <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}

export function SpaceSection() {
  return (
    <section className="space-section section-pad" id="space">
      <div className="section-heading">
        <div>
          <p className="section-label">THE SPACE — 店内</p>
          <h2>
            気取らない、
            <br />
            いい夜がある。
          </h2>
        </div>
        <div className="space-description">
          <p>
            料理を待つ時間も、ごちそうのひとつ。
            <br />
            木の温もりと、ほどよい距離感。
            <br />
            全12席の小さなお店で、ゆっくりお過ごしください。
          </p>
          <p className="seat-count">
            カウンター <b>4</b> 席 <span>／</span> テーブル <b>8</b> 席
          </p>
        </div>
      </div>
      <div className="space-photos">
        <figure>
          <Photo
            name="interior"
            alt="木のカウンターとテーブル席が並ぶ店内"
            sizes="(max-width: 640px) 90vw, 55vw"
          />
          <figcaption>一人飲みも、お連れさまとのお食事も。</figcaption>
        </figure>
        <figure>
          <Photo
            name="counter"
            alt="お酒の瓶が並ぶ温かなカウンター席"
            sizes="(max-width: 640px) 75vw, 30vw"
          />
          <figcaption>お料理やお酒のお話も、お気軽に。</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function InstagramSection() {
  return (
    <section className="instagram-section section-pad" id="instagram">
      <div className="section-heading">
        <div>
          <p className="section-label">日々のおすすめ・お知らせ</p>
          <h2>
            今夜の一皿は、
            <br className="mobile-break" />
            Instagramで。
          </h2>
          <p className="instagram-description">
            お店の近況や、日々の料理はこちらから。
          </p>
        </div>
        <a className="instagram-button" href={instagram} {...external}>
          <Camera size={24} />
          <span>
            <strong>公式Instagramを見る</strong>
            <small>@kure_5562023</small>
          </span>
          <ArrowUpRight size={22} />
        </a>
      </div>
      <div className="instagram-photos">
        {[
          ['sashimi', '地魚のお造り'],
          ['yakitori', '香ばしく焼き上げた串料理'],
          ['aji', '地あじフライ'],
        ].map(([name, alt]) => (
          <a
            href={instagram}
            {...external}
            key={name}
            aria-label={alt + 'の写真。公式Instagramへ（新しいタブ）'}
          >
            <Photo
              name={name}
              alt={alt}
              sizes="(max-width: 640px) 30vw, 28vw"
            />
            <span>
              <Camera size={19} />
              <span>Instagramへ</span>
              <ArrowUpRight size={17} />
            </span>
          </a>
        ))}
      </div>
      <p className="fine-print">
        掲載写真はお料理の一例です。最新の投稿はInstagramでご覧いただけます。
      </p>
    </section>
  );
}

export function AccessSection() {
  return (
    <section className="access-section section-pad" id="access">
      <div className="access-title">
        <p className="section-label">ACCESS & HOURS</p>
        <h2>今夜は、紅へ。</h2>
        <p>
          四季酒肴 地魚 紅 五-五六
          <br />
          <span className="fine-print">くれごーごーろく</span>
        </p>
        <p>
          神奈川県横須賀市深田台36
          <br />
          京急線 横須賀中央駅より徒歩3分
        </p>
        <a className="text-link" href={map} {...external}>
          <MapPin size={18} />
          Googleマップで開く
          <ArrowUpRight size={18} />
        </a>
        <p className="fine-print access-note">
          専用駐車場はございません。
          <br />
          近隣のコインパーキングをご利用ください。
          <br />
          お支払いは現金のみとなります。
        </p>
      </div>
      <div className="hours">
        <h3>営業時間</h3>
        <dl>
          {[
            ['月曜日', '17:00〜22:00', 'L.O. 21:30'],
            ['火・水曜日', '17:00〜22:00', 'L.O. 21:30'],
            ['木曜日', '17:30〜22:00', 'L.O. 21:30'],
            ['金・土曜日', '17:00〜23:00', 'L.O. 22:30'],
            ['日曜日', '定休日', ''],
          ].map(([day, time, last]) => (
            <div className="hours-row" key={day}>
              <dt>{day}</dt>
              <dd>
                {time}
                {last && <small>{last}</small>}
              </dd>
            </div>
          ))}
        </dl>
        <div className="lunch-hours">
          <p>
            <b>ランチ｜火・水・土曜日</b>
            <br />
            12:00〜14:00 <span>（L.O. 13:30）</span>
          </p>
          <p>
            フィッシュバーガーのテイクアウトのみ。
            <br />
            営業状況はお電話でご確認ください。
          </p>
        </div>
        <p className="fine-print">
          夜のL.O.は料理・ドリンク共通です。
          <br />
          焼き物のL.O.は閉店1時間前となります。
        </p>
      </div>
    </section>
  );
}
