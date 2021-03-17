// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { OnboardingPageComponent } from './pages/onboarding/onboarding.component';
import { OnboardingSuccessPageComponent } from './pages/onboarding-success/onboarding-success.component';
import { OnboardingUnavailablePageComponent } from './pages/onboarding-unavailable/onboarding-unavailable.component';

const routes: Routes = [
  {
    path: 'onboarding',
    component: OnboardingPageComponent,
  },
  {
    path: 'onboarding/success',
    component: OnboardingSuccessPageComponent,
  },
  {
    path: 'onboarding/unavailable',
    component: OnboardingUnavailablePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class OnboardingRoutingModule {}
