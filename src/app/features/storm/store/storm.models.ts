export interface StormData {
  clientId: number;
  lattitude: number;
  longitude: number;
  stormName: string;
  address: string;
  windRisk: string;
  surgeRisk: string;
  advisoryDate: Date;
  maxFlood: number;
  landfallLocation: string;
  landfallDateTime: Date;
  stormDistance: number;
}
