// Labels are read from the owner's supplied photographs, not a live stock list.
export const sakePhotos = [
  { name: 'sake-w', label: 'W ひだほまれ' },
  { name: 'sake-true-white', label: 'True White' },
  { name: 'sake-toumi', label: 'OCEAN99 橙海' },
  { name: 'sake-seijitsu', label: '晴日' },
  { name: 'sake-soraumi', label: 'OCEAN99 空海' },
  { name: 'sake-itaru', label: '至' },
  { name: 'sake-hassen', label: '陸奥八仙 ISARIBI' },
  { name: 'sake-kakurei-purple', label: '鶴齢 深紫' },
  { name: 'sake-mogura-abe', label: 'もぐら・あべ' },
  { name: 'sake-selection', label: '越の誉・ゆきのまゆ ほか' },
  { name: 'sake-kakurei-white', label: '鶴齢 卯の花色' },
  { name: 'sake-hanamura', label: '花邑' },
] as const;

export const suppliedPhotoDimensions: Record<
  string,
  readonly [number, number]
> = {
  'sake-zaku': [1500, 2000],
  'sake-zaku-counter': [1500, 2000],
  ...Object.fromEntries(sakePhotos.map(({ name }) => [name, [1500, 2000]])),
  'sake-true-white': [1355, 2936],
};
