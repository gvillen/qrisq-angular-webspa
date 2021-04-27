import { Action, createAction, props } from '@ngrx/store';
import { SignUp } from '../models/identity.models';

export const actionCheckServiceAreaRequest = createAction(
  '[SignUp] Check Service Area Request',
  props<{ lattitude: number; longitude: number }>()
);

export const actionCheckServiceAreaRequestSuccess = createAction(
  '[SignUp] Check Service Area Request Success',
  props<{ available: boolean; services: Array<string> }>()
);

export const actionServiceAreaAvailable = createAction(
  '[SignUp] Service Area Available',
  props<{ onlyWind: boolean }>()
);

export const actionServiceAreaUnavailable = createAction(
  '[SignUp] Service Area Unavailable'
);

export const actionGeocodeLocationRequest = createAction(
  '[SignUp] Geocode Location Request',
  props<{ lattitude: number; longitude: number }>()
);

export const actionGeocodeLocationRequestSuccess = createAction(
  '[SignUp] Geocode Location Request Success',
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
  '[SignUp] Geocode Location Request Failed'
);

export const actionRegisterStart = createAction(
  '[SignUp] Register Start',
  props<{
    subscriptionPlanId: number;
  }>()
);

export const actionRegisterFormSubmit = createAction(
  '[SignUp] Register Form Submit',
  props<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
  }>()
);

export const actionCreateAccountRequest = createAction(
  '[SignUp] Create Account Request',
  props<{
    signUp: SignUp;
  }>()
);

export const actionCreateAccountRequestSuccess = createAction(
  '[SignUp] Create Account Request Success'
);

export const actionCreateAccountRequestFailed = createAction(
  '[SignUp] Create Account Request Failed'
);

export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';

export const SIGN_UP_CHECK_SERVICE_AREA_REQUEST =
  'SIGN_UP_CHECK_SERVICE_AREA_REQUEST';
export const SIGN_UP_CHECK_SERVICE_AREA_SUCCESS =
  'SIGN_UP_CHECK_SERVICE_AREA_SUCCESS';

export class SignUpAction implements Action {
  readonly type = SIGN_UP;

  constructor(
    public payload: {
      email: string;
      password: string;
      confirm_password: string;
      first_name: string;
      last_name: string;
      phone_number: string;
      address: {
        lat: number;
        lng: number;
        displayText: string;
      };
      street_number: string;
      city: string;
      state: string;
      zip_code: string;
      subbscription_plan_id: string;
      payment_id: string;
    }
  ) {}
}

export class SignUpSuccessAction implements Action {
  readonly type = SIGN_UP_SUCCESS;

  constructor(public payload: { effect: string }) {}
}

export class SignUpCheckServiceAreaRequestAction implements Action {
  readonly type = SIGN_UP_CHECK_SERVICE_AREA_REQUEST;

  constructor(public payload: { lattitude: number; longitude: number }) {}
}

export class SignUpCheckServiceAreaSuccessAction implements Action {
  readonly type = SIGN_UP_CHECK_SERVICE_AREA_SUCCESS;

  constructor(
    public payload: { available: boolean; services: Array<string> }
  ) {}
}

export type SignUpActions =
  | SignUpAction
  | SignUpSuccessAction
  | SignUpCheckServiceAreaRequestAction
  | SignUpCheckServiceAreaSuccessAction;
