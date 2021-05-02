export interface StormData {
  clientId?: number;
  lattitude?: number;
  longitude?: number;
  stormName?: string;
  address?: string;
  windRisk?: string;
  surgeRisk?: string;
  advisoryDate?: string;
  nextAdvisoryDate?: string;
  maxFlood?: number;
  landfallLocation?: string;
  landfallDate?: Date;
  stormDistance?: number;
  lineGeoJSON?: Object;
  pointsGeoJSON?: Object;
  polygonsGeoJSON?: Object;
  surgeGeoJSON?: Object;
  windGeoJSON?: Object;
  windData?: Object;
}
