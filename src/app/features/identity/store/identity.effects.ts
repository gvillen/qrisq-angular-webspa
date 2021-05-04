import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import {
  actionCheckServiceAreaRequest,
  actionCheckServiceAreaRequestSuccess,
  actionCreateAccountRequest,
  actionCreateAccountRequestSuccess,
  actionGeocodeLocationRequest,
  actionGeocodeLocationRequestSuccess,
  actionRegisterFormSubmit,
  actionRegisterStart,
  actionServiceAreaAvailable,
  actionServiceAreaUnavailable,
  actionSignInFailed,
  actionSignInRequest,
  actionSignInSuccess,
  actionSignOut,
  actionVerifyEmailRequest,
  actionVerifyEmailRequestFailed,
  actionVerifyEmailRequestSuccess,
} from './identity.actions';
import { Store } from '@ngrx/store';
import { selectSignUp } from './identity.selectors';
import { QrIdentityService } from '../services/identity.service';
import { HttpSignInResponse } from '../models/HttpSignInResponse.models';
import { HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class IdentityEffects {
  effectCheckServiceAreaRequest = createEffect(() =>
    this.actions$.pipe(
      ofType(actionCheckServiceAreaRequest),
      switchMap((action) =>
        this.identityService
          .checkServiceArea(action.lattitude, action.longitude)
          .pipe(
            map((result: { available: boolean; services: Array<string> }) =>
              actionCheckServiceAreaRequestSuccess({
                available: result.available,
                services: result.services,
              })
            ),
            catchError((error) => EMPTY)
          )
      )
    )
  );

  effectCheckServiceAreaRequestSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(actionCheckServiceAreaRequestSuccess),
      map((action) => {
        if (action.available) {
          return actionServiceAreaAvailable({
            onlyWind: !action.services.includes('surge'),
          });
        }
        return actionServiceAreaUnavailable();
      })
    )
  );

  effectServiceAreaAvailable = createEffect(() =>
    this.actions$.pipe(
      ofType(actionServiceAreaAvailable),
      withLatestFrom(this.store.select(selectSignUp)),
      map(([action, signUp]) => {
        this.router.navigate(
          ['identity', 'sign-up', 'service-area-available'],
          {
            queryParams: {
              lattitude: signUp.lattitude,
              longitude: signUp.longitude,
            },
          }
        );
        return actionGeocodeLocationRequest({
          lattitude: signUp.lattitude,
          longitude: signUp.longitude,
        });
      })
    )
  );

  effectServiceAreaUnvailable = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionServiceAreaUnavailable),
        tap((action) =>
          this.router.navigate(['sign-up', 'service-area-unavailable'], {
            relativeTo: this.route,
          })
        )
      ),
    { dispatch: false }
  );

  effectGeocodeLocationRequest = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGeocodeLocationRequest),
      switchMap((action) =>
        this.identityService
          .geocodeLocation(action.lattitude, action.longitude)
          .pipe(
            take(1),
            map((result) => {
              const address: {
                formattedAddress?: string;
                displayText?: string;
                city?: string;
                state?: string;
                streetName?: string;
                streetNumber?: string;
                zip?: string;
              } = {
                formattedAddress: '',
                displayText: '',
                city: '',
                state: '',
                streetName: '',
                streetNumber: '',
                zip: '',
              };

              if (result.length > 0) {
                address.formattedAddress = result[0].formatted_address;

                const { address_components: components } = result[0];
                const includesStreetNumber = (c) =>
                  c.types.includes('street_number');
                const includesStreetName = (c) => c.types.includes('route');
                const includesCity = (c) => c.types.includes('locality');
                const includesState = (c) =>
                  c.types.includes('administrative_area_level_1');
                const includesZip = (c) => c.types.includes('postal_code');

                if (components.some(includesStreetNumber)) {
                  address.streetNumber = components.find(
                    includesStreetNumber
                  ).long_name;
                  address.displayText += address.streetNumber + ' ';
                }

                if (components.some(includesStreetName)) {
                  address.streetName = components.find(
                    includesStreetName
                  ).long_name;
                  address.displayText += address.streetName + ', ';
                }

                if (components.some(includesCity)) {
                  address.city = components.find(includesCity).long_name;
                  address.displayText += address.city + ', ';
                }

                if (components.some(includesState)) {
                  address.state = components.find(includesState).short_name;
                  address.displayText += address.state + ', ';
                }

                if (components.some(includesZip)) {
                  address.zip = components.find(includesZip).long_name;
                  address.displayText += address.zip;
                }
              }
              return actionGeocodeLocationRequestSuccess(address);
            })
          )
      )
    )
  );

  effectRegisterStart = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionRegisterStart),
        tap((action) => {
          this.router.navigate(['/identity/sign-up/register'], {
            relativeTo: this.route,
          });
        })
      ),
    { dispatch: false }
  );

  effectRegisterFormSubmit = createEffect(() =>
    this.actions$.pipe(
      ofType(actionRegisterFormSubmit),
      withLatestFrom(this.store.select(selectSignUp)),
      map(([action, signUp]) => actionVerifyEmailRequest({ signUp }))
    )
  );

  //
  // Verify Email Request
  //
  effectVerifyEmailRequest = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionVerifyEmailRequest),
        switchMap((action) =>
          this.identityService.verifyEmail(action.signUp.email).pipe(
            take(1),
            map((response) => {
              this.router.navigate(['/identity/sign-up/geolocation']);
            }),
            catchError((error: HttpErrorResponse) => {
              if (error.status === 400) {
                this.notification.create(
                  'error',
                  'Error',
                  'Email already exist.',
                  { nzPlacement: 'bottomRight' }
                );
              } else {
                this.notification.create('error', 'Error', error.message, {
                  nzPlacement: 'bottomRight',
                });
              }
              return of(error);
            })
          )
        )
      ),
    { dispatch: false }
  );

  //
  // SignOut
  //
  effectSignOut = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionSignOut),
        switchMap((action) =>
          this.identityService.signOut(action.refreshToken).pipe(take(1))
        )
      ),
    { dispatch: false }
  );

  //
  // Create Account Request
  //
  effectCreateAccountRequest = createEffect(() =>
    this.actions$.pipe(
      ofType(actionCreateAccountRequest),
      switchMap((action) =>
        this.identityService.createAccount(action.signUp).pipe(
          take(1),
          map((action) => actionCreateAccountRequestSuccess())
        )
      )
    )
  );

  effectCreateAccountRequestSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionCreateAccountRequestSuccess),
        tap((action) => {
          this.router.navigate(['/identity/sign-up/account-created']);
        })
      ),
    { dispatch: false }
  );

  effectSignInRequest = createEffect(() =>
    this.actions$.pipe(
      ofType(actionSignInRequest),
      switchMap(({ username, password }) =>
        this.identityService.signIn(username, password).pipe(
          take(1),
          map((response: HttpSignInResponse) => {
            return actionSignInSuccess({ response });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(actionSignInFailed({ error }));
          })
        )
      )
    )
  );

  effectSignInRequestSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionSignInSuccess),
        map((action) => {
          this.notification.create('success', 'Bienvenido', '', {
            nzPlacement: 'bottomRight',
          });
          this.router.navigate(['storm']);
        })
      ),
    {
      dispatch: false,
    }
  );

  effectSignInRequestFailed = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionSignInFailed),
        map((action) => {
          if (action.error.status === 401) {
            this.notification.create(
              'error',
              'Failed',
              'User or password not valid.',
              { nzPlacement: 'bottomRight' }
            );
          } else {
            this.notification.create('error', 'Error', action.error.message, {
              nzPlacement: 'bottomRight',
            });
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private actions$: Actions,
    private identityService: QrIdentityService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private notification: NzNotificationService
  ) {}
}
