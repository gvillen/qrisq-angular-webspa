import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HomeFalseComponent } from './home-false.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzImageModule } from 'ng-zorro-antd/image';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    GooglePlaceModule,
    NzCardModule,
    NzInputModule,
    NzLayoutModule,
    NzMenuModule,
    NzImageModule,
    NzButtonModule,
  ],
  exports: [],
  declarations: [HomeFalseComponent],
  providers: [],
})
export class HomeFalseModule {}
