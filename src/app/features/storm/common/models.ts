import { WindRiskCategoryId } from './enums';

export interface WindRiskCategory {
  id: WindRiskCategoryId;
  shortDesc: string;
  speedDesc: string;
  colorHex: string;
}
