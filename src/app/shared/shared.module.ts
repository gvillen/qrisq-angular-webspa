// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignModule } from '@app/design/design.module';
import { BannerComponent } from './components/banner/banner.component';

@NgModule({
  imports: [
    // angular
    CommonModule,
    DesignModule,
  ],
  declarations: [BannerComponent],
  exports: [BannerComponent],
})
export class SharedModule {}