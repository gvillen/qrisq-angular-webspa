// angular
import { NgModule } from '@angular/core';

// design
import { DesignModule } from '@app/design/design.module';
import { CompanyWidgetGroupComponent } from './components/company-widget-group/company-widget-group.component';

// guard
import { NoAuthGuard } from '@core/guard/no-auth.guard';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// store
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@env';
import { reducers } from './store/core.state';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { IdentityEffects } from '@app/features/identity/store/identity.effects';

@NgModule({
  declarations: [CompanyWidgetGroupComponent],
  imports: [
    DesignModule, // ngrx
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([IdentityEffects]),
  ],
  exports: [CompanyWidgetGroupComponent],
  providers: [NoAuthGuard],
})
export class CoreModule {}
