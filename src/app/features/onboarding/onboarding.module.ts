// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

// design
import { DesignModule } from '@design/design.module';

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
    DesignModule,
    OnboardingRoutingModule,
    GooglePlaceModule,
  ],
  exports: [OnboardingComponent],
})
export class OnboardingModule {}
