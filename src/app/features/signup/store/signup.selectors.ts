import { RootState } from '@app/core/store/core.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SignUpState } from './signup.state';

export const selectSignUpState = createFeatureSelector<RootState, SignUpState>(
  'signup'
);

export const selectSubscriptionPlans = createSelector(
  selectSignUpState,
  (state: SignUpState) => state.subscriptionPlans
);

export const selectSignUp = createSelector(
  selectSignUpState,
  (state: SignUpState) => state.signUp
);
