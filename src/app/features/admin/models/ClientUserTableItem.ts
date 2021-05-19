export interface ClientUserTableItem {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile: Profile;
  subscription_plan?: any;
}

export interface Profile {
  phone_number: string;
  address: Address;
  street_number: string;
  city: string;
  state: string;
  zip_code: string;
  is_preprocessed: boolean;
  address_updated: number;
}

export interface Address {
  lat: number;
  lng: number;
  displayText: string;
}
