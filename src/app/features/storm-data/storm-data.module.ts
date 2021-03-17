// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// design & shared
import { DesignModule } from '@design/design.module';
import { SharedModule } from '@shared/shared.module';

// pages
import { ForecastPageComponent } from './pages/forecast/forecast.component';
import { HindcastPageComponent } from './pages/hindcast/hindcast.component';
import { HistoricalPageComponent } from './pages/historical/historical.component';
import { FaqPageComponent } from './pages/faq/faq.component';

@NgModule({
  declarations: [
    ForecastPageComponent,
    HindcastPageComponent,
    HistoricalPageComponent,
    FaqPageComponent,
  ],
  exports: [
    ForecastPageComponent,
    HindcastPageComponent,
    HistoricalPageComponent,
    FaqPageComponent,
  ],
  imports: [CommonModule, DesignModule, SharedModule],
})
export class StormDataModule {}
