// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { QrIdentityComponent } from './identity.component';

// core, design & shared
import { CoreModule } from '@core/core.module';
import { DesignModule } from '@app/design/design.module';
import { SharedModule } from '@shared/shared.module';

// routing
import { QrIdentityRoutingModule } from './identity-routing.module';

// pages

import { QrIdentityService } from './services/identity.service';
import { QrCheckServiceAreaPageComponent } from './pages/check-service-area/check-service-area.component';
import { PaymentFormCardComponent } from './components/payment-form-card/payment-form-card.component';
import { PaymentFormPaypalComponent } from './components/payment-form-paypal/payment-form-paypal.component';
import { GeolocationStreetViewComponent } from './components/geolocation-street-view/geolocation-street-view.component';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgxPayPalModule } from 'ngx-paypal';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { EffectsModule } from '@ngrx/effects';
import { IdentityEffects } from './store/identity.effects';
import { QrCheckServiceAreaComponentStore } from './pages/check-service-area/check-service-area.component-store';

@NgModule({
  declarations: [
    QrIdentityComponent,
    QrCheckServiceAreaPageComponent,
    GeolocationStreetViewComponent,
    PaymentFormCardComponent,
    PaymentFormPaypalComponent,
  ],
  imports: [
    // angular
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // modules
    CoreModule,
    DesignModule,
    SharedModule,

    // routing
    QrIdentityRoutingModule,

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
    EffectsModule.forFeature([IdentityEffects]),
  ],
  providers: [QrIdentityService, QrCheckServiceAreaComponentStore],
})
export class QrIdentityModule {}
