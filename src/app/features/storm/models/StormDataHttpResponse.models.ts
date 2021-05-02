export interface StormDataHttpResponse {
  client_id?: number;
  storm_name?: string;
  latitude?: string;
  longitude?: string;
  address?: string;
  advisory_date?: string;
  next_advisory_date?: string;
  line_data?: string;
  points_data?: string;
  polygon_data?: string;
  windrisk?: string;
  surgerisk?: string;
  maxflood?: string;
  landfall_location?: string;
  landfall_datetime?: string;
  storm_distance?: string;
  maxflood_datetime?: string;
  maxwind_datetime?: string;
}
