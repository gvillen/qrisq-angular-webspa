// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// modules
import { QrCoreModule } from '@app/core/core.module';
import { QrDesignModule } from '@app/design/design.module';
import { QrSharedModule } from '@app/shared/shared.module';
import { QrAdminPanelPageComponent } from './pages/admin-panel/admin-panel.component';

@NgModule({
  declarations: [QrAdminPanelPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    QrCoreModule,
    QrDesignModule,
    QrSharedModule,
  ],
  exports: [QrAdminPanelPageComponent],
})
export class QrAdminModule {}
