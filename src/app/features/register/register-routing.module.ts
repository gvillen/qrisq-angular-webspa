// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// pages
import { RegisterPageComponent } from './pages/register/register.component';
import { RegisterPaymentPageComponent } from './pages/payment/payment.component';
import { RegisterPaymentSuccessfulPageComponent } from './pages/payment-successful/payment-successful.component';
import { RegisterAccountCreatedPageComponent } from './pages/account-created/account-created.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'register/payment',
    component: RegisterPaymentPageComponent,
  },
  {
    path: 'register/payment-successful',
    component: RegisterPaymentSuccessfulPageComponent,
  },
  {
    component: RegisterAccountCreatedPageComponent,
    path: 'register/account-created',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
