'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type Item = readonly [string, string];
function PriceList({ items }: { items: readonly Item[] }) {
  return <dl className="price-list">{items.map(([name, price]) => <div key={name}><dt>{name}</dt><dd>{price}<small>円</small></dd></div>)}</dl>;
}
export function FoodMenu() {
  return <Accordion className="site-accordion" aria-label="料理メニュー">
    <AccordionItem value="fish"><AccordionTrigger>地魚・お造り・揚げ物</AccordionTrigger><AccordionContent><PriceList items={[
      ['釣りあじ', '900'], ['いさき', '800'], ['たこ（店内仕上げ）', '880'], ['地あじフライ', '900'], ['地魚白身フライ', '800'], ['地魚南蛮漬け', '650'],
    ]}/></AccordionContent></AccordionItem>
    <AccordionItem value="side"><AccordionTrigger>お酒に合わせる、一品料理</AccordionTrigger><AccordionContent><PriceList items={[
      ['自家製ポテトサラダ', '700'], ['クリームチーズおかかくるみ和え', '800'], ['もつ煮込み', '700'], ['鶏皮ぽん酢', '580'], ['あさりのチャンジャ', '550'], ['つぶ貝わさび', '550'],
    ]}/></AccordionContent></AccordionItem>
    <AccordionItem value="grill"><AccordionTrigger>焼き物</AccordionTrigger><AccordionContent><PriceList items={[
      ['極上豚バラ', '380'], ['極上鶏レバー（信玄どり）', '300'], ['極上鶏ハツ（信玄どり）', '300'], ['極上鶏皮', '280'],
    ]}/><p className="fine-print">焼き物のラストオーダーは閉店1時間前です。</p></AccordionContent></AccordionItem>
  </Accordion>;
}
export function DrinkMenu() {
  return <Accordion className="site-accordion drinks-menu" aria-label="ドリンクメニュー">
    <AccordionItem value="drinks"><AccordionTrigger>お飲み物のお品書き</AccordionTrigger><AccordionContent><PriceList items={[
      ['日本酒（至・春霞など）', '880〜'], ['サッポロ黒ラベル 樽生', '680'], ['サッポロラガー 中瓶', '700'], ['デュワーズ ホワイトラベル', '600'], ['濃いめのレモンサワー', '550'], ['男梅サワー', '550'], ['焼酎（村正・回展）', '600'], ['梅酒', '630〜'], ['ソフトドリンク', '380〜'],
    ]}/></AccordionContent></AccordionItem>
  </Accordion>;
}
