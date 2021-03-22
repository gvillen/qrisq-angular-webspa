// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// pages
import { CompanyServicesHomeownersComponentPage } from './pages/homeowners/homeowners.component';
import { CompanyServicesGovernmentComponentPage } from './pages/government/government.component';
import { CompanyServicesInsuranceComponentPage } from './pages/insurance/insurance.component';

const routes: Routes = [
  {
    path: 'services/homeowners',
    component: CompanyServicesHomeownersComponentPage,
  },
  {
    path: 'services/government',
    component: CompanyServicesGovernmentComponentPage,
  },
  {
    path: 'services/insurance',
    component: CompanyServicesInsuranceComponentPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CompanyServicesRoutingModule {}
