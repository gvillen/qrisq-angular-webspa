// angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// components
import { HomeComponent } from './home.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule],
  exports: [],
  declarations: [HomeComponent],
  providers: [],
})
export class HomeModule {}
