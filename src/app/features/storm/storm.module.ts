// angular
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoreModule } from '@core/core.module';
import { DesignModule } from '@app/design/design.module';
import { SharedModule } from '@shared/shared.module';

import { QrStormService } from './services/storm.service';

import { QrStormPageComponent } from './pages/storm/storm-page.component';
import { QrStormMapComponent } from './components/qr-storm-map/qr-storm-map.component';
import { QrStormDataComponent } from './components/qr-storm-data/qr-storm-data.component';

// pages
// components
// google maps
// core, design & shared
@NgModule({
  declarations: [
    QrStormPageComponent,
    QrStormMapComponent,
    QrStormDataComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    CoreModule,
    DesignModule,
    SharedModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCWrBf7hkK6LQdlv7ul98DzcyoFdF1OzLM',
    }),
  ],
  providers: [QrStormService, GoogleMapsAPIWrapper],
  exports: [QrStormPageComponent],
})
export class QrStormModule {}
