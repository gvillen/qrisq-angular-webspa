// angular
import { NgModule } from '@angular/core';

// design
import { DesignModule } from '@design/design.module';
import { CompanyWidgetGroupComponent } from './components/company-widget-group/company-widget-group.component';

// guard
import { NoAuthGuard } from '@core/guard/no-auth.guard';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// store
import { reducers } from './store/core.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@env';

@NgModule({
  declarations: [CompanyWidgetGroupComponent],
  imports: [
    DesignModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  exports: [CompanyWidgetGroupComponent],
  providers: [NoAuthGuard],
})
export class CoreModule {}
