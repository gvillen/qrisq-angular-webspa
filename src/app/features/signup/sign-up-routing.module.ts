// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// pages
import { SignUpCheckServiceAreaPageComponent } from './pages/check-service-area/check-service-area.component';
import { SignUpServiceAreaAvailablePageComponent } from './pages/service-area-available/service-area-available';
import { SignUpServiceAreaUnavailablePageComponent } from './pages/service-area-unavailable/service-area-unavailable.component';

import { SignUpRegisterPageComponent } from './pages/register/register.component';
import { RegisterPaymentPageComponent } from './pages/payment/payment.component';
import { RegisterPaymentSuccessfulPageComponent } from './pages/payment-successful/payment-successful.component';
import { RegisterAccountCreatedPageComponent } from './pages/account-created/account-created.component';
import { RegisterGeolocationPageComponent } from './pages/geolocation/geolocation.component';

export const routes: Routes = [
  {
    path: 'sign-up',
    redirectTo: 'sign-up/check-service-area',
    pathMatch: 'full',
  },
  {
    path: 'sign-up/check-service-area',
    component: SignUpCheckServiceAreaPageComponent,
  },
  {
    path: 'sign-up/service-area-available',
    component: SignUpServiceAreaAvailablePageComponent,
  },
  {
    path: 'sign-up/service-area-unavailable',
    component: SignUpServiceAreaUnavailablePageComponent,
  },
  {
    path: 'sign-up/register',
    component: SignUpRegisterPageComponent,
  },
  {
    path: 'sign-up/payment',
    component: RegisterPaymentPageComponent,
  },
  {
    path: 'sign-up/payment-successful',
    component: RegisterPaymentSuccessfulPageComponent,
  },
  {
    path: 'sign-up/geolocation',
    component: RegisterGeolocationPageComponent,
  },
  {
    component: RegisterAccountCreatedPageComponent,
    path: 'sign-up/account-created',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class SignUpRoutingModule {}
