// angular
import { NgModule } from '@angular/core';

// design
import { DesignModule } from '@design/design.module';

// guard
import { NoAuthGuard } from '@core/guard/no-auth.guard';

@NgModule({
  declarations: [],
  imports: [DesignModule],
  exports: [],
  providers: [NoAuthGuard],
})
export class CoreModule {}
