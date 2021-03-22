import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyServicesComponent } from './company-services.component';
import { DesignModule } from '@app/design/design.module';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { CompanyServicesRoutingModule } from './company-services-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DesignModule,
    CoreModule,
    SharedModule,
    CompanyServicesRoutingModule,
  ],
  declarations: [CompanyServicesComponent],
})
export class CompanyServicesModule {}
