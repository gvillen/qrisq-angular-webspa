// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// core, design & shared
import { CoreModule } from '@app/core/core.module';
import { DesignModule } from '@app/design/design.module';
import { SharedModule } from '@app/shared/shared.module';

// component
import { CompanyServicesComponent } from './company-services.component';

// routing
import { CompanyServicesRoutingModule } from './company-services-routing.module';

// pages
import { CompanyServicesHomeownersComponentPage } from './pages/homeowners/homeowners.component';
import { CompanyServicesGovernmentComponentPage } from './pages/government/government.component';
import { CompanyServicesInsuranceComponentPage } from './pages/insurance/insurance.component';

@NgModule({
  declarations: [
    CompanyServicesComponent,
    CompanyServicesHomeownersComponentPage,
    CompanyServicesGovernmentComponentPage,
    CompanyServicesInsuranceComponentPage,
  ],
  imports: [
    CommonModule,
    DesignModule,
    CoreModule,
    SharedModule,
    CompanyServicesRoutingModule,
  ],
  exports: [
    CompanyServicesComponent,
    CompanyServicesHomeownersComponentPage,
    CompanyServicesGovernmentComponentPage,
    CompanyServicesInsuranceComponentPage,
  ],
})
export class CompanyServicesModule {}
