// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// core, design & shared
import { DesignModule } from '@design/design.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';

// routing
import { RegisterRoutingModule } from './register-routing.module';

// components
import { RegisterComponent } from './register.component';
import { PaymentFormCardComponent } from './components/payment-form-card/payment-form-card.component';
import { PaymentFormPaypalComponent } from './components/payment-form-paypal/payment-form-paypal.component';
import { GeolocationStreetViewComponent } from './components/geolocation-street-view/geolocation-street-view.component';

// pages
import { RegisterPageComponent } from './pages/register/register.component';
import { RegisterPaymentPageComponent } from './pages/payment/payment.component';
import { RegisterPaymentSuccessfulPageComponent } from './pages/payment-successful/payment-successful.component';
import { RegisterAccountCreatedPageComponent } from './pages/account-created/account-created.component';
import { RegisterGeolocationPageComponent } from './pages/geolocation/geolocation.component';

// paypal
import { NgxPayPalModule } from 'ngx-paypal';

// google maps
import { AgmCoreModule } from '@agm/core';

// angular-credit-cards
import { CreditCardDirectivesModule } from 'angular-cc-library';

@NgModule({
  declarations: [
    // components
    RegisterComponent,
    PaymentFormCardComponent,
    PaymentFormPaypalComponent,
    GeolocationStreetViewComponent,

    // pages
    RegisterPageComponent,
    RegisterPaymentPageComponent,
    RegisterPaymentSuccessfulPageComponent,
    RegisterAccountCreatedPageComponent,
    RegisterGeolocationPageComponent,
  ],
  imports: [
    // angular
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    // core, design & shared
    CoreModule,
    DesignModule,
    SharedModule,

    // routing
    RegisterRoutingModule,

    // angular google maps
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCWrBf7hkK6LQdlv7ul98DzcyoFdF1OzLM',
    }),

    // paypal
    NgxPayPalModule,

    // angular-cc-library
    CreditCardDirectivesModule,
  ],
  exports: [RegisterComponent],
})
export class RegisterModule {}
