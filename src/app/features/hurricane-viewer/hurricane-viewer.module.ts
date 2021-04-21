// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// pages
import { WindRiskPageComponent } from './pages/wind-risk/wind-risk.component';

// components
import { HurricaneViewerComponent } from './hurricane-viewer.component';

// services
import { HurricaneWindService } from './services/hurricane-wind-service';

// routing
import { HurricaneViewerRoutingModule } from './hurricane=viewer-routing';

// google maps
import { AgmCoreModule } from '@agm/core';

// core, design & shared
import { DesignModule } from '@design/design.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [HurricaneViewerComponent, WindRiskPageComponent],
  imports: [
    // angular
    CommonModule,

    // core, design & shared
    CoreModule,
    DesignModule,
    SharedModule,

    // routing
    HurricaneViewerRoutingModule,

    // google maps
    AgmCoreModule,
  ],
  providers: [HurricaneWindService],
})
export class HurricaneViewerModule {}
