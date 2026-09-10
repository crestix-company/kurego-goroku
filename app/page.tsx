import { ArrowDown, ArrowUpRight, Camera, MapPin, Phone } from 'lucide-react';
import { FoodMenu, DrinkMenu } from './menus';

const reservation = 'https://v2.rsv-crane.jp/reservation-form?manager_code=q6q7';
const instagram = 'https://www.instagram.com/kure_5562023/';
const map = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('四季酒肴 地魚 紅 五-五六 神奈川県横須賀市深田台36');
const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
const navigation = [['#about', 'この店のこと'], ['#food', 'お料理'], ['#drink', 'お飲み物'], ['#access', '店舗案内']] as const;

function Photo({ name, alt, className = '', sizes = '(max-width: 640px) 90vw, 45vw', priority = false }: { name: string; alt: string; className?: string; sizes?: string; priority?: boolean }) {
  const widths: Record<string, number> = { hero: 1600, sashimi: 1200, aji: 1108, simmered: 1108, fresh: 1108, yakitori: 1108, burger: 1200, sake: 900, interior: 900, counter: 900 };
  return <img className={className} src={`/images/${name}.webp`} srcSet={`/images/${name}-small.webp 600w, /images/${name}.webp ${widths[name]}w`} sizes={sizes} alt={alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />;
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">本文へ移動</a>
      <header className="site-header">
        <a className="brand" href="/" aria-label="四季酒肴 地魚 紅 五-五六 ホーム">
          <span className="brand-caption">四季酒肴 地魚</span>
          <span className="brand-name"><b>紅</b> 五-五六</span>
        </a>
        <nav className="desktop-nav" aria-label="メインナビゲーション">{navigation.map(([url, text]) => <a href={url} key={url}>{text}</a>)}</nav>
        <a className="header-social" href={instagram} {...external} aria-label="公式Instagramを見る（新しいタブ）"><Camera size={19} /><span>Instagram</span></a>
        <a className="header-reserve" href={reservation} {...external}>お席のご予約<ArrowUpRight size={17} /></a>
      </header>
      <nav className="mobile-nav" aria-label="ページ内ナビゲーション">{navigation.map(([url, text]) => <a href={url} key={url}>{text}</a>)}</nav>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-visual"><Photo name="hero" alt="三浦半島の旬の地魚を盛り込んだ紅 五-五六のお造り" priority sizes="(max-width: 640px) 100vw, 72vw" /></div>
          <div className="hero-copy">
            <p className="eyebrow">横須賀・三浦半島の地魚と日本酒</p>
            <h1 id="hero-title"><span>今宵も、</span><span>旬と一献。</span></h1>
            <p className="hero-description">旨い魚と、旨い酒。<br />今日だけの一皿に出会う、小さな一軒。</p>
            <a className="text-link light" href={reservation} {...external}>お席を予約する<ArrowUpRight size={20} /></a>
          </div>
          <div className="hero-bottom"><span>KURE GO-GOROKU</span><a href="#about">この店のこと<ArrowDown size={16} /></a><span>四季酒肴・地魚</span></div>
        </section>
        <div className="welcome-strip"><p>横須賀中央駅 徒歩3分</p><span aria-hidden="true">／</span><p>カウンター4席・テーブル8席</p><span aria-hidden="true">／</span><p>日曜定休</p></div>

        <section className="intro section-pad" id="about">
          <div className="intro-side"><p className="section-label">01 — この店のこと</p><figure className="intro-photo"><Photo name="fresh" alt="その日に仕入れた新鮮な地魚" sizes="(max-width: 640px) 75vw, 30vw" /><figcaption>今日の海から、今日の一皿へ。</figcaption></figure></div>
          <div className="intro-copy"><p className="english-label">THE SEASON, ON YOUR PLATE.</p><h2>三浦半島の旬を、<br />一番おいしい<br className="desktop-break" />食べ方で。</h2>
            <p>その日の漁で、出会う魚が変わる。<br />だから、今日の献立は今日の魚から。</p>
            <p>信頼する仲卸から届く、三浦半島の地魚。<br className="desktop-break" />料理人歴20年以上の店主が一尾ずつ見極め、<br className="desktop-break" />お造りに、焼き物に、煮付けに。</p>
            <p>気取らずに、旬を味わう。<br />おひとりでふらりと、大切な人とゆっくりと。<br />紅 五-五六で、心ほどけるひとときを。</p>
          </div>
        </section>

        <section className="food-section section-pad dark" id="food">
          <div className="section-heading"><div><p className="section-label">02 — お料理</p><h2>今、いちばんの味を。</h2></div><p>季節が変われば、献立も変わる。<br />地魚の持ち味を生かした一皿を、<br />その日のおすすめでお楽しみください。</p></div>
          <div className="food-gallery">
            <article><div className="food-image"><Photo name="sashimi" alt="地魚を中心としたお造りの盛り合わせ" sizes="(max-width: 640px) 82vw, 30vw" /><span>一</span></div><p className="english-label">SASHIMI</p><h3>まずは、お造りから。</h3><p>つりあじをはじめ、旬の地魚を。<br />魚それぞれの旨みを、まっすぐに。</p></article>
            <article><div className="food-image"><Photo name="aji" alt="香ばしく揚げた地あじフライ" sizes="(max-width: 640px) 82vw, 30vw" /><span>二</span></div><p className="english-label">FRIED LOCAL FISH</p><h3>さっくり、ふっくら。</h3><p>地魚ならではのおいしさをフライに。<br />お酒と合わせたい、親しみのある一品。</p></article>
            <article><div className="food-image"><Photo name="simmered" alt="地魚の旨みを生かした煮付け" sizes="(max-width: 640px) 82vw, 30vw" /><span>三</span></div><p className="english-label">SEASONAL DISHES</p><h3>じんわり、旬を味わう。</h3><p>煮付けも、焼き物も、その魚に合わせて。<br />箸が進む一皿に、もう一杯。</p></article>
          </div>
          <p className="swipe-hint">写真は横にスワイプできます <span aria-hidden="true">→</span></p>
          <div className="menu-wrap"><div><p className="section-label">お品書き</p><p>お料理の一例です。<br />仕入れにより内容・価格が変わる場合がございます。<br /><span className="fine-print">表示価格は税込です。写真は一例です。</span></p></div><FoodMenu /></div>
        </section>

        <section className="drink-section section-pad" id="drink">
          <div className="drink-image"><Photo name="sake" alt="紅 五-五六で取り扱う日本酒の一例" /><p>SAKE &amp; GOOD COMPANY</p></div>
          <div className="drink-copy"><p className="section-label">03 — お飲み物</p><h2>魚を引き立てる、<br />その一杯。</h2><p>選ぶのは、魚料理と相性のよい日本酒。<br />季節ごとに変わる銘柄から、今夜の一杯を。</p><p>「この料理には、どれが合いますか？」<br />そんなご相談も、お気軽にどうぞ。</p><DrinkMenu /><p className="fine-print">銘柄・内容は季節や仕入れにより変わります。表示価格は税込です。</p></div>
        </section>

        <section className="takeout-section" id="takeout">
          <div className="takeout-visual"><Photo name="burger" alt="地魚のフライとタルタルソースを挟んだフィッシュバーガー" /><span className="takeout-mark">昼は、<br />地魚バーガー。</span></div>
          <div className="takeout-copy"><p className="section-label">LUNCH — TAKE OUT ONLY</p><h2>海のごちそうを、<br />持ち帰ろう。</h2><p>地魚のおいしさを、もっと気軽に。<br />サクッと揚げた魚を挟んだ、<br />紅 五-五六のフィッシュバーガー。</p><div className="takeout-hours"><strong>火・水・土曜日</strong><span>12:00〜14:00 <small>（L.O. 13:30）</small></span></div><p className="takeout-note">お昼はテイクアウトのみの営業です。<br />魚の仕入れ状況により、お休みとなる場合がございます。ご来店前にお電話でご確認ください。</p><a className="text-link light" href="tel:09064950556"><Phone size={18} />電話で営業を確認する<ArrowUpRight size={18} /></a></div>
        </section>

        <section className="space-section section-pad" id="space">
          <div className="section-heading"><div><p className="section-label">04 — 店内</p><h2>気取らない、<br />いい夜がある。</h2></div><div className="space-description"><p>料理を待つ時間も、ごちそうのひとつ。<br />木の温もりと、ほどよい距離感。<br />全12席の小さなお店で、ゆっくりお過ごしください。</p><p className="seat-count">カウンター <b>4</b> 席 <span>／</span> テーブル <b>8</b> 席</p></div></div>
          <div className="space-photos"><figure><Photo name="interior" alt="木のカウンターとテーブル席が並ぶ店内" sizes="(max-width: 640px) 90vw, 55vw" /><figcaption>一人飲みも、お連れさまとのお食事も。</figcaption></figure><figure><Photo name="counter" alt="お酒の瓶が並ぶ温かなカウンター席" sizes="(max-width: 640px) 75vw, 30vw" /><figcaption>お料理やお酒のお話も、お気軽に。</figcaption></figure></div>
        </section>

        <section className="instagram-section section-pad" id="instagram">
          <div className="section-heading"><div><p className="section-label">日々のおすすめ・お知らせ</p><h2>今夜の一皿は、<br className="mobile-break" />Instagramで。</h2><p className="instagram-description">お店の近況や、日々の料理はこちらから。</p></div><a className="instagram-button" href={instagram} {...external}><Camera size={24} /><span><strong>公式Instagramを見る</strong><small>@kure_5562023</small></span><ArrowUpRight size={22} /></a></div>
          <div className="instagram-photos">{[['sashimi','地魚のお造り'],['yakitori','香ばしく焼き上げた串料理'],['aji','地あじフライ']].map(([name, alt])=><a href={instagram} {...external} key={name} aria-label={alt+'の写真。公式Instagramへ（新しいタブ）'}><Photo name={name} alt={alt} sizes="(max-width: 640px) 30vw, 28vw" /><span><Camera size={19}/><span>Instagramへ</span><ArrowUpRight size={17}/></span></a>)}</div>
          <p className="fine-print">掲載写真はお料理の一例です。最新の投稿はInstagramでご覧いただけます。</p>
        </section>

        <section className="access-section section-pad" id="access">
          <div className="access-title"><p className="section-label">05 — 店舗案内</p><h2>今夜は、紅へ。</h2><p>四季酒肴 地魚 紅 五-五六<br /><span className="fine-print">くれごーごーろく</span></p><p>神奈川県横須賀市深田台36<br />京急線 横須賀中央駅より徒歩3分</p><a className="text-link" href={map} {...external}><MapPin size={18}/>Googleマップで開く<ArrowUpRight size={18}/></a><p className="fine-print access-note">専用駐車場はございません。<br />近隣のコインパーキングをご利用ください。<br />お支払いは現金のみとなります。</p></div>
          <div className="hours"><h3>営業時間</h3><dl>{[
            ['月曜日','17:00〜22:00','L.O. 21:30'],
            ['火・水曜日','17:00〜22:00','L.O. 21:30'],
            ['木曜日','17:30〜22:00','L.O. 21:30'],
            ['金・土曜日','17:00〜23:00','L.O. 22:30'],
            ['日曜日','定休日',''],
          ].map(([day,time,last])=><div className="hours-row" key={day}><dt>{day}</dt><dd>{time}{last&&<small>{last}</small>}</dd></div>)}</dl><div className="lunch-hours"><p><b>ランチ｜火・水・土曜日</b><br />12:00〜14:00 <span>（L.O. 13:30）</span></p><p>フィッシュバーガーのテイクアウトのみ。<br />営業状況はお電話でご確認ください。</p></div><p className="fine-print">夜のL.O.は料理・ドリンク共通です。<br />焼き物のL.O.は閉店1時間前となります。</p></div>
        </section>

        <section className="reservation-section" id="reservation"><div><p className="section-label">RESERVATION</p><h2>お席のご予約</h2><p>お食事のご予約はこちらから。<br />貸切のご相談は、お電話にて承ります。</p></div><div className="reservation-links"><a className="button" href={reservation} {...external}>WEBでお席を予約する<ArrowUpRight size={22}/></a><a className="phone-link" href="tel:09064950556"><Phone size={22}/><span>090-6495-0556</span></a><p>お電話でも、ご予約・お問い合わせを承ります。</p></div></section>
      </main>
      <footer><a className="footer-brand" href="#main"><img src="/images/logo.webp" width="84" height="84" alt="紅 五-五六 ロゴ" loading="lazy"/><span>四季酒肴 地魚<br/><strong>紅 五-五六</strong></span></a><div className="footer-right"><a href={instagram} {...external}><Camera size={18}/>公式Instagram<ArrowUpRight size={16}/></a><small>© KURE GO-GOROKU</small></div><a href="#main" className="back-top" aria-label="ページの先頭へ">↑</a></footer>
      <nav className="mobile-actions" aria-label="ご予約とお問い合わせ"><a href="tel:09064950556"><Phone size={17}/>電話</a><a href={instagram} {...external}><Camera size={17}/>Instagram</a><a className="mobile-reserve" href={reservation} {...external}>WEB予約<ArrowUpRight size={17}/></a></nav>
    </>
  );
}
