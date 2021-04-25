import { SignUpEffects } from './store/signup.effects';
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
import { SignUpRoutingModule } from './sign-up-routing.module';

// components
import { SignUpComponent as SignUpComponent } from './sign-up.component';
import { PaymentFormCardComponent } from './components/payment-form-card/payment-form-card.component';
import { PaymentFormPaypalComponent } from './components/payment-form-paypal/payment-form-paypal.component';
import { GeolocationStreetViewComponent } from './components/geolocation-street-view/geolocation-street-view.component';

// pages
import { SignUpCheckServiceAreaPageComponent } from './pages/check-service-area/check-service-area.component';
import { SignUpServiceAreaAvailablePageComponent } from './pages/service-area-available/service-area-available';
import { SignUpServiceAreaUnavailablePageComponent } from './pages/service-area-unavailable/service-area-unavailable.component';

import { SignUpRegisterPageComponent } from './pages/register/register.component';
import { RegisterPaymentPageComponent } from './pages/payment/payment.component';
import { RegisterPaymentSuccessfulPageComponent } from './pages/payment-successful/payment-successful.component';
import { RegisterAccountCreatedPageComponent } from './pages/account-created/account-created.component';
import { RegisterGeolocationPageComponent } from './pages/geolocation/geolocation.component';

// services
import { SignUpService } from './service/signup.service';

// store
import { SignUpStore } from './store/SignUpStore.service';

// paypal
import { NgxPayPalModule } from 'ngx-paypal';

// google maps
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

// angular-credit-cards
import { CreditCardDirectivesModule } from 'angular-cc-library';

// store
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    // components
    SignUpComponent,
    SignUpCheckServiceAreaPageComponent,
    SignUpServiceAreaAvailablePageComponent,
    SignUpServiceAreaUnavailablePageComponent,
    PaymentFormCardComponent,
    PaymentFormPaypalComponent,
    GeolocationStreetViewComponent,

    // pages

    SignUpRegisterPageComponent,
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
    SignUpRoutingModule,

    // angular google maps
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCWrBf7hkK6LQdlv7ul98DzcyoFdF1OzLM',
    }),
    GooglePlaceModule,

    // paypal
    NgxPayPalModule,

    // angular-cc-library
    CreditCardDirectivesModule,

    // ngrx
    EffectsModule.forFeature([SignUpEffects]),
  ],
  exports: [SignUpComponent],
  providers: [SignUpService, SignUpStore],
})
export class SignUpModule {}
