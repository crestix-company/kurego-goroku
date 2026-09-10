import { siteOrigin, assetUrl } from '@/lib/site-url';
import type { Metadata } from 'next';
import './globals.css';
import './multipage.css';
import './motion.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  icons: { icon: assetUrl('/icon.png') },
  title: {
    default: '四季酒肴 地魚 紅 五-五六 | 横須賀中央の地魚と日本酒',
    template: '%s | 紅 五-五六',
  },
  description:
    '三浦半島の旬を、一番おいしい食べ方で。横須賀中央の四季酒肴 地魚 紅 五-五六。日替わりの魚料理と日本酒を、全12席の温かな空間でお楽しみください。',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
