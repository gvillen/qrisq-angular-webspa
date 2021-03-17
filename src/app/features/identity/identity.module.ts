// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IdentityComponent } from './identity.component';

// design
import { DesignModule } from '@design/design.module';

// routing
import { IdentityRoutingModule } from './identity-routing.module';

// pages
import { IdentityLoginPageComponent } from './pages/login/login.component';

@NgModule({
  declarations: [IdentityComponent, IdentityLoginPageComponent],
  imports: [
    CommonModule,
    DesignModule,
    IdentityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class IdentityModule {}
