// angular
import { Component, OnInit } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { selectCredentials } from './features/identity/store/identity.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Qrisq';

  isUserLogin: boolean;
  isUserLogin$ = this.store
    .select(
      createSelector(
        selectCredentials,
        (credentialsState) => credentialsState && credentialsState.accessToken
      )
    )
    .subscribe((accessToken) => {
      console.log(accessToken);
      if (accessToken) {
        this.isUserLogin = true;
      } else {
        this.isUserLogin = false;
      }
    });

  userFirstName: string;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // this.identityService.isAuthenticated();
    // this.isUserLogin = this.identityService.isAuthenticated();
    // this.identityService.getUser().subscribe((user) => {
    //   this.userFirstName = user.first_name;
    // });
    // this.identityService.isUserLogin().subscribe((isUserLogin) => {
    //   this.isUserLogin = isUserLogin;
    // });
  }
}
