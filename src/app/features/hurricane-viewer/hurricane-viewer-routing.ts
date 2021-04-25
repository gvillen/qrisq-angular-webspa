// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// pages
import { WindRiskPageComponent } from './pages/wind-risk/wind-risk.component';

export const routes: Routes = [
  {
    path: 'hurricane-viewer/wind-risk',
    component: WindRiskPageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class HurricaneViewerRoutingModule {}
