export interface UserAddress {
  displayText: string;
  lat: string;
  lng: string;
}

export interface UserProfile {
  address: UserAddress;
  city: string;
  isPreprocessed: boolean;
  phoneNumber: string;
  state: string;
  streetNumber: string;
  zipCode: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profile: UserProfile;
}
