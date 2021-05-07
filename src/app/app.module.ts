// angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import en from '@angular/common/locales/en';

// google maps
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

// routing
import { AppRoutingModule } from './app-routing.module';

// modules
import { QrCoreModule } from '@core/core.module';
import { QrDesignModule } from '@app/design/design.module';
import { QrSharedModule } from '@shared/shared.module';

// features
import { QrStormModule } from './features/storm/storm.module';
import { environment } from '@env';

// components
import { AppComponent } from './app.component';

// pages
import { QrHistoricalPageComponent } from './pages/storm-data/historical-page/historical-page.component';
import { QrFaqPageComponent } from './pages/storm-data/faq-page/faq-page.component';
import { QrForecastPageComponent } from './pages/storm-data/forecast-page/forecast-page.component';
import { QrHomeownersPageComponent } from './pages/services/homeowners-page/homeowners-page.component';
import { QrGovernmentPageComponent } from './pages/services/government-page/government.component';
import { QrInsurancePageComponent } from './pages/services/insurance-page/insurance-page.component';
import { QrHindcastPageComponent } from './pages/storm-data/hindcast-page/hindcast-page.component';
import { QrHomePageComponent } from './pages/home/home-page.component';

// store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// state
import { reducers, storageSyncReducer } from './core/store/state';
import { QrStormEffects } from './features/storm/store/storm.effects';
import { IdentityEffects } from './features/identity/store/identity.effects';
import { QrIdentityModule } from './features/identity/identity.module';
import { QrTrackStormCardComponent } from './shared/components/cards/track-storm/track-storm.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    QrHomePageComponent,
    QrHomeownersPageComponent,
    QrGovernmentPageComponent,
    QrHomeownersPageComponent,
    QrInsurancePageComponent,
    QrFaqPageComponent,
    QrForecastPageComponent,
    QrHindcastPageComponent,
    QrHistoricalPageComponent,
  ],
  imports: [
    // angular
    BrowserModule,
    BrowserAnimationsModule,

    // bootstrap
    NgbModule,

    // store
    StoreModule.forRoot(reducers, { metaReducers: [storageSyncReducer] }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([IdentityEffects, QrStormEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),

    // Google
    GooglePlaceModule,

    // routing
    AppRoutingModule,

    // modules
    QrCoreModule,
    QrDesignModule,
    QrSharedModule,

    // features
    QrIdentityModule,
    QrStormModule,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
