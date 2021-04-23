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
import { StormDataModule } from '@features/storm-data/storm-data.module';
import { SignUpModule } from '@app/features/signup/sign-up.module';
import { IdentityModule } from '@features/identity/identity.module';
import { CompanyServicesModule } from '@features/company-services/company-services.module';
import { HurricaneViewerModule } from './features/hurricane-viewer/hurricane-viewer.module';

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
    SignUpModule,
    StormDataModule,
    IdentityModule,
    CompanyServicesModule,
    HurricaneViewerModule,

    // angular
    BrowserModule,
    BrowserAnimationsModule,

    // routing
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
