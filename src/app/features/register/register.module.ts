// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// design
import { DesignModule } from '@design/design.module';

// routing
import { RegisterRoutingModule } from './register-routing.module';

// components
import { RegisterComponent } from './register.component';
import { PaymentFormCardComponent } from './components/payment-form-card/payment-form-card.component';
import { PaymentFormPaypalComponent } from './components/payment-form-paypal/payment-form-paypal.component';

// pages
import { RegisterPageComponent } from './pages/register/register.component';
import { RegisterPaymentPageComponent } from './pages/payment/payment.component';
import { RegisterPaymentSuccessfulPageComponent } from './pages/payment-successful/payment-successful.component';
import { RegisterAccountCreatedPageComponent } from './pages/account-created/account-created.component';

// maps

@NgModule({
  declarations: [
    RegisterComponent,
    RegisterPageComponent,
    RegisterPaymentPageComponent,
    RegisterPaymentSuccessfulPageComponent,
    RegisterAccountCreatedPageComponent,
    PaymentFormCardComponent,
    PaymentFormPaypalComponent,
  ],
  imports: [
    CommonModule,
    DesignModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RegisterComponent],
})
export class RegisterModule {}
