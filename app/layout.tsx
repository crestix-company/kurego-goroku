import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://kurego-goroku.s-nishita.chatgpt.site'),
  title: '四季酒肴 地魚 紅 五-五六 | 横須賀中央の地魚と日本酒',
  description: '三浦半島の旬を、一番おいしい食べ方で。横須賀中央の四季酒肴 地魚 紅 五-五六。日替わりの魚料理と日本酒を、全12席の温かな空間でお楽しみください。',
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
  return <html lang="ja"><body>{children}</body></html>;
}
