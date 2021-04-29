// ngrx
import { RootState } from '@app/core/store/core.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IdentityState } from './identity.models';

export const selectIdentityState = createFeatureSelector<
  RootState,
  IdentityState
>('identity');

// signUp
export const selectSignUp = createSelector(
  selectIdentityState,
  (state: IdentityState) => state.signUp
);

export const selectSignIn = createSelector(
  selectIdentityState,
  (state: IdentityState) => state.signIn
);

export const selectCredentials = createSelector(
  selectIdentityState,
  (state: IdentityState) => state.credentials
);
