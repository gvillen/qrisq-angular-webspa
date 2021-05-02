export enum SurgeRiskLevelId {
  NoRisk = 'N',
  LowRisk = 'L',
  ModerateRisk = 'M',
  HighRisk = 'H',
}

export interface SurgeRiskLevel {
  id: SurgeRiskLevelId;
  riskDesc: string;
  levelDesc: string;
  colorHex: string;
  iconUrl: string;
}
