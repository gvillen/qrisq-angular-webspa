// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// design
import { DesignModule } from '@design/design.module';

// components
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';


@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
    ContentComponent,
    FooterComponent,
    BannerComponent,
  ],
  imports: [CommonModule, NgbModule, DesignModule, RouterModule],
  exports: [
    HeaderComponent,
    LayoutComponent,
    ContentComponent,
    FooterComponent,
    BannerComponent,
  ],
})
export class SharedModule {}
