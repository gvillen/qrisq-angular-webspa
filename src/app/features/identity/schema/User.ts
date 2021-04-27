export interface UserAddress {
  displayText: string;
  lat: string;
  lng: string;
}

export interface UserProfile {
  address: UserAddress;
  city: string;
  is_preprocessed: boolean;
  phone_number: string;
  state: string;
  street_number: string;
  zip_code: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile: UserProfile;
}

export interface HttpResponseUser {
  access: string;
  refresh: string;
  user_info: User;
}
