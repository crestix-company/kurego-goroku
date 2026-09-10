import { pageUrl, assetUrl } from '@/lib/site-url';
import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Camera, Phone } from 'lucide-react';
import { PageBreadcrumb } from './page-breadcrumb';
import { MotionEffects } from './motion';
export const reservation =
  'https://v2.rsv-crane.jp/reservation-form?manager_code=q6q7';
export const instagram = 'https://www.instagram.com/kure_5562023/';
export const map =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('四季酒肴 地魚 紅 五-五六 神奈川県横須賀市深田台36');
export const external = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;
export const navigation = [
  { href: '/', label: 'トップ', short: 'トップ' },
  { href: '/about', label: 'お店について', short: 'お店' },
  { href: '/food', label: 'お料理', short: 'お料理' },
  { href: '/drink', label: 'お飲み物', short: 'お飲み物' },
  { href: '/access', label: '店舗案内・予約', short: '店舗案内' },
];
const photoDimensions: Record<string, readonly [number, number]> = {
  hero: [1600, 1067],
  sashimi: [1200, 900],
  aji: [1108, 1477],
  simmered: [1108, 1477],
  fresh: [1108, 1477],
  yakitori: [1108, 1477],
  burger: [1200, 800],
  sake: [900, 608],
  interior: [900, 600],
  counter: [900, 600],
};
export function Photo({
  name,
  alt,
  className = '',
  sizes = '(max-width: 640px) 90vw, 45vw',
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [width, height] = photoDimensions[name];
  return (
    <img
      className={className}
      src={assetUrl(`/images/${name}.webp`)}
      srcSet={`${assetUrl(`/images/${name}-small.webp`)} 600w, ${assetUrl(`/images/${name}.webp`)} ${width}w`}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
}
function Navigation({
  path,
  mobile = false,
}: {
  path: string;
  mobile?: boolean;
}) {
  return (
    <nav
      className={mobile ? 'mobile-nav' : 'desktop-nav'}
      aria-label={
        mobile ? 'スマートフォン用メインメニュー' : 'メインナビゲーション'
      }
    >
      {navigation.map((item) => (
        <a
          href={pageUrl(item.href)}
          key={item.href}
          aria-current={path === item.href ? 'page' : undefined}
        >
          {mobile ? item.short : item.label}
        </a>
      ))}
    </nav>
  );
}
export function Reservation() {
  return (
    <section className="reservation-section" id="reservation">
      <div>
        <p className="section-label">RESERVATION</p>
        <h2>お席のご予約</h2>
        <p>
          お食事のご予約はこちらから。
          <br />
          貸切のご相談は、お電話にて承ります。
        </p>
      </div>
      <div className="reservation-links">
        <a className="button" href={reservation} {...external}>
          WEBでお席を予約する
          <ArrowUpRight size={22} />
        </a>
        <a className="phone-link" href="tel:09064950556">
          <Phone size={22} />
          <span>090-6495-0556</span>
        </a>
        <p>お電話でも、ご予約・お問い合わせを承ります。</p>
      </div>
    </section>
  );
}
export function SiteFrame({
  path,
  children,
}: {
  path: string;
  children: ReactNode;
}) {
  return (
    <>
      <MotionEffects />
      <a className="skip-link" href="#main">
        本文へ移動
      </a>
      <header className="site-header">
        <a
          className="brand"
          href={pageUrl('/')}
          aria-label="四季酒肴 地魚 紅 五-五六 ホーム"
        >
          <span className="brand-caption">四季酒肴 地魚</span>
          <span className="brand-name">
            <b>紅</b> 五-五六
          </span>
        </a>
        <Navigation path={path} />
        <a
          className="header-social"
          href={instagram}
          {...external}
          aria-label="公式Instagramを見る（新しいタブ）"
        >
          <Camera size={19} />
          <span>Instagram</span>
        </a>
        <a className="header-reserve" href={reservation} {...external}>
          お席のご予約
          <ArrowUpRight size={17} />
        </a>
      </header>
      <Navigation path={path} mobile />
      <main id="main">
        {children}
        <Reservation />
      </main>
      <footer>
        <a className="footer-brand" href={pageUrl('/')}>
          <img
            src={assetUrl("/images/logo.webp")}
            width="84"
            height="84"
            alt="紅 五-五六 ロゴ"
            loading="lazy"
          />
          <span>
            四季酒肴 地魚
            <br />
            <strong>紅 五-五六</strong>
          </span>
        </a>
        <div className="footer-navigation">
          <nav aria-label="フッターメニュー">
            {navigation.map((item) => (
              <a
                href={pageUrl(item.href)}
                key={item.href}
                aria-current={path === item.href ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a href={pageUrl('/food#takeout')}>
            ランチ・テイクアウト
            <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="footer-right">
          <a href={instagram} {...external}>
            <Camera size={18} />
            公式Instagram
            <ArrowUpRight size={16} />
          </a>
          <small>© KURE GO-GOROKU</small>
        </div>
        <a href="#main" className="back-top" aria-label="ページの先頭へ">
          ↑
        </a>
      </footer>
      <nav className="mobile-actions" aria-label="ご予約とお問い合わせ">
        <a href="tel:09064950556">
          <Phone size={17} />
          電話
        </a>
        <a href={instagram} {...external}>
          <Camera size={17} />
          Instagram
        </a>
        <a className="mobile-reserve" href={reservation} {...external}>
          WEB予約
          <ArrowUpRight size={17} />
        </a>
      </nav>
    </>
  );
}
export function PageHero({
  label,
  english,
  number,
  title,
  description,
  photo,
  alt,
  tone = 'ink',
}: {
  label: string;
  english: string;
  number: string;
  title: ReactNode;
  description: ReactNode;
  photo: string;
  alt: string;
  tone?: string;
}) {
  return (
    <>
      <PageBreadcrumb label={label} />
      <section
        className={`page-hero tone-${tone}`}
        aria-labelledby="page-title"
      >
        <div className="page-hero-copy">
          <p className="page-kicker">
            <span>{number}</span> {english}
          </p>
          <h1 id="page-title">{label}</h1>
          <h2>{title}</h2>
          <p className="page-hero-description">{description}</p>
        </div>
        <div className="page-hero-photo">
          <Photo
            name={photo}
            alt={alt}
            priority
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
      </section>
    </>
  );
}
export function NextPage({
  href,
  label,
  english,
}: {
  href: string;
  label: string;
  english: string;
}) {
  return (
    <a className="next-page" href={pageUrl(href)}>
      <span>
        <small>NEXT — {english}</small>
        <strong>{label}</strong>
      </span>
      <ArrowRight size={34} />
    </a>
  );
}
