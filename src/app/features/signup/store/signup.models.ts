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

export interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
}
