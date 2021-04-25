export interface NewUserSubscriptionPlan {
  id: number;
  name: string;
  price: number;
}

export interface NewUserAddress {
  formattedAddress?: string;
  displayText?: string;
  streetName?: string;
  streetNumber?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export interface NewUser {
  lat?: number;
  lng?: number;
  windServiceOnly?: boolean;
  firstName?: string;
  lastName?: string;
  password?: string;
  phoneNumber?: string;
  subscriptionPlan?: NewUserSubscriptionPlan;
  paymentId?: string;
  address?: NewUserAddress;
  email?: string;
}
