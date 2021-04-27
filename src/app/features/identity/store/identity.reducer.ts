import { Action, createReducer, on } from '@ngrx/store';
import {
  actionCheckServiceAreaRequest,
  actionCheckServiceAreaRequestSuccess,
  actionCreateAccountRequest,
  actionCreateAccountRequestFailed,
  actionCreateAccountRequestSuccess,
  actionGeocodeLocationRequest,
  actionGeocodeLocationRequestFailed,
  actionGeocodeLocationRequestSuccess,
  actionRegisterFormSubmit,
  actionRegisterStart,
  actionServiceAreaAvailable,
  actionServiceAreaUnavailable,
} from './identity.actions';
import { IdentityState } from './identity.models';
import { initialState } from './identity.state';

const reducer = createReducer(
  initialState,
  on(actionCheckServiceAreaRequest, (state, { lattitude, longitude }) => ({
    ...state,
    signUp: { lattitude, longitude },
    loading: true,
  })),
  on(actionCheckServiceAreaRequestSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(actionServiceAreaAvailable, (state, { onlyWind }) => ({
    ...state,
    signUp: { ...state.signUp, onlyWind },
    loading: false,
  })),
  on(actionServiceAreaUnavailable, (state) => ({
    ...state,
    signUp: null,
    loading: false,
  })),
  on(actionGeocodeLocationRequest, (state) => ({ ...state })),
  on(actionGeocodeLocationRequestSuccess, (state, address) => ({
    ...state,
    signUp: {
      ...state.signUp,
      addressFormatted: address.formattedAddress,
      addressDisplayText: address.displayText,
      addressStreetName: address.streetName,
      addressStreetNumber: address.streetNumber,
      addressCity: address.city,
      addressState: address.state,
      addressZip: address.zip,
    },
  })),
  on(actionGeocodeLocationRequestFailed, (state) => ({
    ...state,
    signup: {
      ...state.signUp,
      addressFormatted: 'error en geocodificado',
      addressDisplayText: 'error en geocodificado',
      addressStreetName: '',
      addressStreetNumber: '',
      addressCity: '',
      addressState: '',
      addressZip: '',
    },
  })),
  on(actionRegisterStart, (state, { subscriptionPlanId }) => ({
    ...state,
    signUp: { ...state.signUp, subscriptionPlanId },
  })),
  on(
    actionRegisterFormSubmit,
    (state, { firstName, lastName, email, password, phoneNumber }) => ({
      ...state,
      signUp: {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        ...state.signUp,
      },
    })
  ),
  on(actionCreateAccountRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(actionCreateAccountRequestSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(actionCreateAccountRequestFailed, (state) => ({
    ...state,
    loading: false,
  }))
);

export function IdentityReducer(
  state: IdentityState | undefined,
  action: Action
): IdentityState {
  return reducer(state, action);
}
