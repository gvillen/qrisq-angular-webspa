// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrStormViewerPageComponent } from './pages/storm-viewer/storm-viewer-page.component';

// pages

export const routes: Routes = [
  {
    path: 'hurricane-viewer/wind-risk',
    component: QrStormViewerPageComponent,
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
