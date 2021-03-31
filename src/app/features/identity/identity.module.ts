// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IdentityComponent } from './identity.component';

// core, design & shared
import { CoreModule } from '@core/core.module';
import { DesignModule } from '@design/design.module';
import { SharedModule } from '@shared/shared.module';

// routing
import { IdentityRoutingModule } from './identity-routing.module';

// pages
import { IdentityLoginPageComponent } from './pages/login/login.component';

@NgModule({
  declarations: [IdentityComponent, IdentityLoginPageComponent],
  imports: [
    // angular
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    // core, design & shared
    CoreModule,
    DesignModule,
    SharedModule,

    // routing
    IdentityRoutingModule,
  ],
})
export class IdentityModule {}
