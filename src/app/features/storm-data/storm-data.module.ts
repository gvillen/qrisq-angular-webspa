// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// design, core and shared
import { DesignModule } from '@app/design/design.module';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';

// component
import { StormDataComponent } from './storm-data.component';

// pages
import { StormDataFaqPageComponent } from './pages/faq-page/faq-page.component';
import { StormDataHistoricalPageComponent } from '../../pages/storm-data/historical-page/historical-page.component';
import { StormDataHindcastPageComponent } from './pages/hindcast-page/hindcast-page.component';
import { StormDataForecastPageComponent } from './pages/forecast-page/forecast-page.component';

// routing
import { StormDataRoutingModule } from './storm-data-routing.module';

@NgModule({
  declarations: [
    StormDataComponent,
    StormDataForecastPageComponent,
    StormDataHindcastPageComponent,
    StormDataHistoricalPageComponent,
    StormDataFaqPageComponent,
  ],
  exports: [
    StormDataForecastPageComponent,
    StormDataHindcastPageComponent,
    StormDataHistoricalPageComponent,
    StormDataFaqPageComponent,
  ],
  imports: [
    CommonModule,
    DesignModule,
    CoreModule,
    SharedModule,
    StormDataRoutingModule,
  ],
})
export class StormDataModule {}
