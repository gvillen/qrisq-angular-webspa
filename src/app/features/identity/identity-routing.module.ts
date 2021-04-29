// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// component
import { QrIdentityComponent } from './identity.component';
import { QrCheckServiceAreaPageComponent } from './pages/check-service-area/check-service-area.component';
import { QrServiceAreaAvailablePageComponent } from './pages/service-area-available-page/service-area-available-page.componet';

export const routes: Routes = [
  {
    path: 'sign-up',
    component: QrCheckServiceAreaPageComponent,
  },
  {
    path: 'service-area-available',
    component: QrServiceAreaAvailablePageComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrIdentityRoutingModule {}
