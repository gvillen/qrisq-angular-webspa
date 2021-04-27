// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// pages
import { StormDataForecastPageComponent } from './pages/forecast-page/forecast-page.component';
import { StormDataHindcastPageComponent } from './pages/hindcast-page/hindcast-page.component';
import { StormDataHistoricalPageComponent } from '../../pages/storm-data/historical-page/historical-page.component';
import { StormDataFaqPageComponent } from './pages/faq-page/faq-page.component';

const routes: Routes = [
  {
    path: 'storm-data/forecast',
    component: StormDataForecastPageComponent,
  },
  {
    path: 'storm-data/hindcast',
    component: StormDataHindcastPageComponent,
  },
  {
    path: 'storm-data/historical',
    component: StormDataHistoricalPageComponent,
  },
  {
    path: 'storm-data/faq',
    component: StormDataFaqPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class StormDataRoutingModule {}
