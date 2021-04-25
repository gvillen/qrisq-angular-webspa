import { HttpErrorResponse } from '@angular/common/http';
import { SignUp, SubscriptionPlan } from './signup.models';

export interface SignUpState {
  signUp: SignUp;
  subscriptionPlans: Array<SubscriptionPlan>;
  errors: Array<HttpErrorResponse>;
  loading: boolean;
}

export const initialState: SignUpState = {
  signUp: null,
  subscriptionPlans: [],
  errors: [],
  loading: false,
};
