// angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

// google maps
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

// qrisq
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core/core.module';
import { DesignModule } from '@app/design/design.module';
import { SharedModule } from '@shared/shared.module';

import { AppComponent } from './app.component';
import { AppLayoutComponent } from './components/layout/layout.component';
import { AppHeaderComponent } from './components/header/header.component';
import { AppContentComponent } from './components/content/content.component';
import { AppFooterComponent } from './components/footer/footer.component';

import { QrHistoricalPageComponent } from './pages/storm-data/historical-page/historical-page.component';
import { QrFaqPageComponent } from './pages/storm-data/faq-page/faq-page.component';
import { QrForecastPageComponent } from './pages/storm-data/forecast-page/forecast-page.component';
import { QrHomeownersPageComponent } from './pages/services/homeowners-page/homeowners-page.component';
import { QrGovernmentPageComponent } from './pages/services/government-page/government.component';
import { QrInsurancePageComponent } from './pages/services/insurance-page/insurance-page.component';
import { QrHindcastPageComponent } from './pages/storm-data/hindcast-page/hindcast-page.component';
import { QrIdentityModule } from './features/identity/identity.module';
import { QrHomePageComponent } from './pages/home-page/home-page.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    AppHeaderComponent,
    AppContentComponent,
    AppFooterComponent,
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

    // third-party
    GooglePlaceModule,

    AppRoutingModule,
    // qrisq
    CoreModule,
    DesignModule,
    SharedModule,
    QrIdentityModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
