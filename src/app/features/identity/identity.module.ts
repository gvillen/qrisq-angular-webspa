// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IdentityComponent } from './identity.component';

// core, design & shared
import { CoreModule } from '@core/core.module';
import { DesignModule } from '@design/design.module';
import { SharedModule } from '@shared/shared.module';

// routing
import { IdentityRoutingModule } from './identity-routing.module';

// pages
import { IdentityLoginPageComponent } from './pages/login/login.component';
import { IdentityService } from './services/IdentityService.service';

@NgModule({
  declarations: [IdentityComponent, IdentityLoginPageComponent],
  imports: [
    // angular
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // core, design & shared
    CoreModule,
    DesignModule,
    SharedModule,

    // routing
    IdentityRoutingModule,
  ],
  providers: [IdentityService],
})
export class IdentityModule {}
