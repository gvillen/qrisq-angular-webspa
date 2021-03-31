// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// pages
import { IdentityLoginPageComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: 'identity/login',
    component: IdentityLoginPageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class IdentityRoutingModule {}
