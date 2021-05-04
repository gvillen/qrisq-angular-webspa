import { HttpErrorResponse } from '@angular/common/http';
import { Action, createAction, props } from '@ngrx/store';
import { GeocodedAddress } from '../models/Geocoding.models';
import { HttpSignInResponse } from '../models/HttpSignInResponse.models';
import { SignUpState } from './identity.models';

export const actionCheckServiceAreaRequest = createAction(
  '[Identity] Check Service Area Request',
  props<{ lattitude: number; longitude: number }>()
);

export const actionCheckServiceAreaRequestSuccess = createAction(
  '[Identity] Check Service Area Request Success',
  props<{ available: boolean; services: Array<string> }>()
);

export const actionServiceAreaAvailable = createAction(
  '[Identity] Service Area Available',
  props<{ onlyWind: boolean }>()
);

export const actionServiceAreaUnavailable = createAction(
  '[Identity] Service Area Unavailable'
);

export const actionGeocodeLocationRequest = createAction(
  '[Identity] Geocode Location Request',
  props<{ lattitude: number; longitude: number }>()
);

export const actionGeocodeLocationRequestSuccess = createAction(
  '[Identity] Geocode Location Request Success',
  props<{
    formattedAddress?: string;
    displayText?: string;
    city?: string;
    state?: string;
    streetName?: string;
    streetNumber?: string;
    zip?: string;
  }>()
);

export const actionGeocodeLocationRequestFailed = createAction(
  '[Identity] Geocode Location Request Failed'
);

export const actionRegisterStart = createAction(
  '[Identity] Register Start',
  props<{
    subscriptionPlanId: number;
  }>()
);

export const actionRegisterFormSubmit = createAction(
  '[Identity] Register Form Submit',
  props<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
  }>()
);

export const actionVerifyEmailRequest = createAction(
  '[Identity] Verify Email Request',
  props<{
    signUp: SignUpState;
  }>()
);

export const actionVerifyEmailRequestSuccess = createAction(
  '[Identity] Verify Email Request Success'
);

export const actionVerifyEmailRequestFailed = createAction(
  '[Identity] Verify Email Request Failed',
  props<{ error: HttpErrorResponse }>()
);

export const actionCreateAccountRequest = createAction(
  '[Identity] Create Account Request',
  props<{
    signUp: SignUpState;
  }>()
);

export const actionCreateAccountRequestSuccess = createAction(
  '[Identity] Create Account Request Success'
);

export const actionCreateAccountRequestFailed = createAction(
  '[Identity] Create Account Request Failed'
);

export const actionSignInRequest = createAction(
  '[Identity] Sign In Request',
  props<{ username: string; password: string }>()
);

export const actionSignInSuccess = createAction(
  '[Identity] Sign In Success',
  props<{ response: HttpSignInResponse }>()
);

export const actionSignInFailed = createAction(
  '[Identity] Sign In Failed',
  props<{ error: HttpErrorResponse }>()
);

export const actionSignUpAddressChanged = createAction(
  '[Identity] Sign In Address Changed',
  props<{ address: GeocodedAddress }>()
);

export const actionAccessTokenRefreshed = createAction(
  '[Identity] Access Token Refreshed',
  props<{ newAccessToken: string }>()
);

export const actionSignOut = createAction(
  '[Identity] Sign Out',
  props<{ refreshToken: string }>()
);
