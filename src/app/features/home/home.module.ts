// angular
import { NgModule } from '@angular/core';

// design & shared
import { DesignModule } from '@design/design.module';
import { SharedModule } from '@shared/shared.module';

// components
import { HomeComponent } from './home.component';
// routing

@NgModule({
  imports: [DesignModule, SharedModule],
  exports: [HomeComponent],
  declarations: [HomeComponent],
  providers: [],
})
export class HomeModule {}
