// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// core, design & shared
import { CoreModule } from '@core/core.module';
import { DesignModule } from '@design/design.module';
import { SharedModule } from '@app/shared/shared.module';

// maps
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

// routing
import { OnboardingRoutingModule } from './onboarding-routing.module';

// component
import { OnboardingComponent } from './onboarding.component';

// pages
import { OnboardingPageComponent } from './pages/onboarding/onboarding.component';
import { OnboardingSuccessPageComponent } from './pages/onboarding-success/onboarding-success.component';
import { OnboardingUnavailablePageComponent } from './pages/onboarding-unavailable/onboarding-unavailable.component';

// maps

@NgModule({
  declarations: [
    OnboardingComponent,
    OnboardingPageComponent,
    OnboardingSuccessPageComponent,
    OnboardingUnavailablePageComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    DesignModule,
    SharedModule,
    OnboardingRoutingModule,
    GooglePlaceModule,
    HttpClientModule,
  ],
  exports: [OnboardingComponent],
})
export class OnboardingModule {}
