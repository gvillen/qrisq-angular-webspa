// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { OnboardingComponent } from '@features/onboarding/onboarding.component';
import { HomeComponent } from '@features/home/home.component';
import { RegisterComponent } from '@features/register/register.component';
import { IdentityComponent } from '@features/identity/identity.component';

// guard
import { NoAuthGuard } from '@core/guard/no-auth.guard';

// pages
import { ForecastPageComponent } from '@features/storm-data/pages/forecast/forecast.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'onboarding',
    component: OnboardingComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: IdentityComponent,
  },

  {
    path: 'storm-data',
    children: [
      {
        path: 'forecast',
        component: ForecastPageComponent,
      },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
