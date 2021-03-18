// angular
import { NgModule } from '@angular/core';

// design
import { DesignModule } from '@design/design.module';
import { CompanyWidgetGroupComponent } from './components/company-widget-group/company-widget-group.component';

// guard
import { NoAuthGuard } from '@core/guard/no-auth.guard';

@NgModule({
  declarations: [CompanyWidgetGroupComponent],
  imports: [DesignModule],
  exports: [CompanyWidgetGroupComponent],
  providers: [NoAuthGuard],
})
export class CoreModule {}
