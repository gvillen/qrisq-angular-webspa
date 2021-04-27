// ngrx
import { RootState } from '@app/core/store/core.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// store

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
