// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// pages
import { IdentityLoginPageComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: IdentityLoginPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class IdentityRoutingModule {}
