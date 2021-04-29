import { AppComponent } from './app.component';
// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// pages
import { QrHomePageComponent } from './home/home-page.component';
import { QrForecastPageComponent } from './pages/storm-data/forecast-page/forecast-page.component';
import { QrFaqPageComponent } from './pages/storm-data/faq-page/faq-page.component';
import { QrHindcastPageComponent } from './pages/storm-data/hindcast-page/hindcast-page.component';
import { QrHistoricalPageComponent } from './pages/storm-data/historical-page/historical-page.component';
import { QrHomeownersPageComponent } from './pages/services/homeowners-page/homeowners-page.component';
import { QrGovernmentPageComponent } from './pages/services/government-page/government.component';
import { QrInsurancePageComponent } from './pages/services/insurance-page/insurance-page.component';

// guard
import { NoAuthGuard } from '@core/guard/no-auth.guard';
import { QrCheckServiceAreaPageComponent } from './features/identity/pages/check-service-area/check-service-area.component';
import { QrServiceAreaAvailablePageComponent } from './features/identity/pages/service-area-available-page/service-area-available-page.componet';
import { QrRegisterPageComponent } from './features/identity/pages/register/register-page.component';
import { QrAccountCreatedPageComponent } from './features/identity/pages/account-created/account-created.component';
import { QrStormViewerPageComponent } from './features/storm/pages/storm/storm-page.component';
import { QrLoginPageComponent } from './features/identity/pages/login-page/login-page.component';
import { QrGeolocationPageComponent } from './features/identity/pages/geolocation/geolocation.component';

const routes: Routes = [
  { path: 'home', component: QrHomePageComponent },
  {
    path: 'storm-data/forecast',
    component: QrForecastPageComponent,
  },
  {
    path: 'storm-data/hindcast',
    component: QrHindcastPageComponent,
  },
  {
    path: 'storm-data/historical',
    component: QrHistoricalPageComponent,
  },
  {
    path: 'storm-data/faq',
    component: QrFaqPageComponent,
  },
  {
    path: 'services/homeowners',
    component: QrHomeownersPageComponent,
  },
  {
    path: 'services/government',
    component: QrGovernmentPageComponent,
  },
  {
    path: 'services/insurance',
    component: QrInsurancePageComponent,
  },
  {
    path: 'identity/sign-up',
    component: QrCheckServiceAreaPageComponent,
  },
  {
    path: 'identity/sign-up/service-area-available',
    component: QrServiceAreaAvailablePageComponent,
  },
  {
    path: 'identity/sign-up/register',
    component: QrRegisterPageComponent,
  },
  {
    path: 'identity/sign-up/geolocation',
    component: QrGeolocationPageComponent,
  },
  {
    path: 'identity/sign-up/account-created',
    component: QrAccountCreatedPageComponent,
  },
  {
    path: 'hurricane-viewer/wind-risk',
    component: QrStormViewerPageComponent,
  },
  {
    path: 'identity/login',
    component: QrLoginPageComponent,
  },
  {
    path: 'storm',
    component: QrStormViewerPageComponent,
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
