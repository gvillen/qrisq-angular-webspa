// angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

// app
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// modules
import { CoreModule } from '@core/core.module';
import { DesignModule } from '@design/design.module';
import { SharedModule } from '@shared/shared.module';

// maps
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

// features
import { HomeModule } from '@features/home/home.module';
import { OnboardingModule } from '@features/onboarding/onboarding.module';
import { StormDataModule } from '@features/storm-data/storm-data.module';
import { RegisterModule } from '@features/register/register.module';
import { IdentityModule } from '@features/identity/identity.module';
import { CompanyServicesModule } from '@features/company-services/company-services.module';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    // core, shared & design
    CoreModule,
    SharedModule,
    DesignModule,

    // maps
    GooglePlaceModule,

    // features
    HomeModule,
    OnboardingModule,
    RegisterModule,
    StormDataModule,
    IdentityModule,
    CompanyServicesModule,

    // angular
    BrowserModule,
    BrowserAnimationsModule,

    // routing
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
