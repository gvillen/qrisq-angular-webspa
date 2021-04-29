// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// pages
import { QrStormViewerPageComponent } from './pages/storm/storm-page.component';

// components
import { StormComponent } from './storm.component';

// services
import { StormService } from './services/storm.service';

// google maps
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core';

// core, design & shared
import { DesignModule } from '@app/design/design.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { HurricaneViewerEffects } from './store/storm.effects';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [StormComponent, QrStormViewerPageComponent],
  imports: [
    // angular
    CommonModule,

    // design & shared
    DesignModule,
    SharedModule,

    RouterModule,

    // google maps
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCWrBf7hkK6LQdlv7ul98DzcyoFdF1OzLM',
    }),

    // ngrx
    EffectsModule.forFeature([HurricaneViewerEffects]),
  ],
  providers: [StormService, GoogleMapsAPIWrapper, QrStormViewerPageComponent],
})
export class QrStormModule {}
