// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// component
import { QrIdentityComponent } from './identity.component';
import { QrCheckServiceAreaPageComponent } from './pages/check-service-area/check-service-area.component';

export const routes: Routes = [
  {
    path: 'identity',
    component: QrIdentityComponent,
  },
  {
    path: 'identity/check-service-area',
    component: QrCheckServiceAreaPageComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class QrIdentityRoutingModule {}
