import {
  SurgeRiskLevel,
  SurgeRiskLevelId,
} from '../models/SurgeRiskLevel.models';
import {
  WindRiskCategory,
  WindRiskCategoryId,
} from '../models/WindRiskCategory.models';

export const WindRiskCategories: Record<
  WindRiskCategoryId,
  Partial<WindRiskCategory>
> = {
  N: {
    id: WindRiskCategoryId.Minimal,
    shortDesc: 'Minimal',
    speedDesc: '',
    colorHex: '#fff',
  },
  TS: {
    id: WindRiskCategoryId.TropicalStorm,
    shortDesc: 'Tropical Storm',
    speedDesc: '39-73 MPH',
    colorHex: '#0404f7',
  },
  '1': {
    id: WindRiskCategoryId.Category1,
    shortDesc: 'Cat 1',
    speedDesc: '74-95 MPH',
    colorHex: '#04f7f7',
  },
  '2': {
    id: WindRiskCategoryId.Category2,
    shortDesc: 'Cat 2',
    speedDesc: '96-110 MPH',
    colorHex: '#04f704',
  },
  '3': {
    id: WindRiskCategoryId.Category3,
    shortDesc: 'Cat 3',
    speedDesc: '111-129 MPH',
    colorHex: '#f7f704',
  },
  '4': {
    id: WindRiskCategoryId.Category4,
    shortDesc: 'Cat 4',
    speedDesc: '130-156 MPH',
    colorHex: '#f7a804',
  },
  '5': {
    id: WindRiskCategoryId.Category5,
    shortDesc: 'Cat 5',
    speedDesc: '157 < MPH',
    colorHex: '#f70404',
  },
};

export const SurgeRiskLevels: Record<
  SurgeRiskLevelId,
  Partial<SurgeRiskLevel>
> = {
  N: {
    id: SurgeRiskLevelId.NoRisk,
    riskDesc: 'NO',
    levelDesc: '-',
    colorHex: '#fff',
    iconUrl: 'assets/icons/surge-risk/no.png',
  },
  L: {
    id: SurgeRiskLevelId.LowRisk,
    riskDesc: 'LOW',
    levelDesc: 'Surge Nearby',
    colorHex: '#f7f704',
    iconUrl: 'assets/icons/surge-risk/low.png',
  },
  M: {
    id: SurgeRiskLevelId.ModerateRisk,
    riskDesc: 'MODERATE',
    levelDesc: 'Up to 3ft.',
    colorHex: '#f7a804',
    iconUrl: 'assets/icons/surge-risk/moderate.png',
  },
  H: {
    id: SurgeRiskLevelId.HighRisk,
    riskDesc: 'HIGH',
    levelDesc: 'More than 3ft.',
    colorHex: '#f70404',
    iconUrl: 'assets/icons/surge-risk/high.png',
  },
};
