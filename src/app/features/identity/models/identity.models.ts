export interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
}

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

export interface SignUp {
  lattitude?: number;
  longitude?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  windServiceOnly?: boolean;
  phoneNumber?: string;
  subscriptionPlanId?: number;
  subscriptionPlanName?: string;
  subscriptionPlanPrice?: number;
  paymentId?: string;
  addressFormatted?: string;
  addressDisplayText?: string;
  addressStreetName?: string;
  addressStreetNumber?: string;
  addressCity?: string;
  addressState?: string;
  addressZip?: string;
}
