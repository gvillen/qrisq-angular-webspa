import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { PaymentComponent } from './payment.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';



@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, NzFormModule, NzGridModule, NzCardModule,  NzInputModule, NzLayoutModule, NzMenuModule, NzImageModule, NzButtonModule],
    exports: [],
    declarations: [PaymentComponent],
    providers: [],
})

export class PaymentModule { }
