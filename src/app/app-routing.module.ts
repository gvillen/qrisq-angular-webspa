// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// pages
import { QrHomePageComponent } from '@app/pages/home-page/home-page.component';
import { QrForecastPageComponent } from './pages/storm-data/forecast-page/forecast-page.component';
import { QrFaqPageComponent } from './pages/storm-data/faq-page/faq-page.component';
import { QrHindcastPageComponent } from './pages/storm-data/hindcast-page/hindcast-page.component';
import { QrHistoricalPageComponent } from './pages/storm-data/historical-page/historical-page.component';
import { QrHomeownersPageComponent } from './pages/services/homeowners-page/homeowners-page.component';
import { QrGovernmentPageComponent } from './pages/services/government-page/government.component';
import { QrInsurancePageComponent } from './pages/services/insurance-page/insurance-page.component';

// guard
import { NoAuthGuard } from '@core/guard/no-auth.guard';
import { QrIdentityComponent } from './features/identity/identity.component';
import { QrCheckServiceAreaPageComponent } from './features/identity/pages/check-service-area/check-service-area.component';

const routes: Routes = [
  { path: 'home', component: QrHomePageComponent },
  { path: 'identity', component: QrCheckServiceAreaPageComponent },
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
    path: 'identity',
    component: QrIdentityComponent,
  },
  {
    path: 'storm',
    loadChildren: () =>
      import('./features/storm/storm.module').then((m) => m.QrStormModule),
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
