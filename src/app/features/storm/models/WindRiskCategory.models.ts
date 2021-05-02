export enum WindRiskCategoryId {
  Category1 = '1',
  Category2 = '2',
  Category3 = '3',
  Category4 = '4',
  Category5 = '5',
  Minimal = 'N',
  TropicalStorm = 'TS',
}

export interface WindRiskCategory {
  id: WindRiskCategoryId;
  shortDesc: string;
  speedDesc: string;
  colorHex: string;
}
