// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { OnboardingComponent } from '@features/onboarding/onboarding.component';
import { HomeComponent } from '@features/home/home.component';
import { RegisterComponent } from '@features/register/register.component';
import { IdentityComponent } from '@features/identity/identity.component';
import { StormDataComponent } from '@features/storm-data/storm-data.component';
import { CompanyServicesComponent } from './features/company-services/company-services.component';
import { HurricaneViewerComponent } from './features/hurricane-viewer/hurricane-viewer.component';

// guard
import { NoAuthGuard } from '@core/guard/no-auth.guard';

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
    component: StormDataComponent,
  },
  {
    path: 'services',
    component: CompanyServicesComponent,
  },
  {
    path: 'hurricane-viewer',
    component: HurricaneViewerComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
