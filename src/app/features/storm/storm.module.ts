// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// pages
import { QrStormViewerPageComponent as QrStormPageComponent } from './pages/storm/storm-page.component';

// components
import { StormComponent } from './storm.component';

// services
import { QrStormDataService } from './services/StormData.service';

// google maps
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core';

// core, design & shared
import { DesignModule } from '@app/design/design.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { QrStormEffects } from './store/storm.effects';
import { RouterModule } from '@angular/router';
import { QrStormSummaryInfoComponent } from './components/qr-storm-summary-info/qr-storm-summary-info.component';
import { QrStormSurgeService } from './services/StormSurgeService.service';
import { QrStormMapComponent } from './components/qr-storm-map/qr-storm-map.component';
import { QrStormSurgeInfoComponent } from './components/qr-storm-surge-info/qr-storm-surge-info.component';

@NgModule({
  declarations: [
    StormComponent,

    // pages
    QrStormPageComponent,

    // summary
    QrStormSummaryInfoComponent,
    QrStormSurgeInfoComponent,

    // map
    QrStormMapComponent,
  ],
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // design & shared
    DesignModule,
    SharedModule,

    RouterModule,

    // google maps
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCWrBf7hkK6LQdlv7ul98DzcyoFdF1OzLM',
    }),

    // ngrx
    EffectsModule.forFeature([QrStormEffects]),
  ],
  providers: [QrStormDataService, QrStormSurgeService, GoogleMapsAPIWrapper],
  exports: [QrStormPageComponent],
})
export class QrStormModule {}
