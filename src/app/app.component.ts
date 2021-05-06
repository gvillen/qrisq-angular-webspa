// angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { actionSignOut } from './features/identity/store/identity.actions';
import { CredentialsState } from './features/identity/store/identity.models';
import {
  selectCredentials,
  selectSignedUser,
} from './features/identity/store/identity.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Qrisq';
  isUserLogin: boolean;
  userFirstName: string;
  subscription: Subscription;
  credentials$: Observable<CredentialsState>;
  credentials: CredentialsState;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select(selectSignedUser)
      .subscribe((signedUser) => {
        if (signedUser) {
          this.isUserLogin = true;
          this.userFirstName = signedUser.user.firstName;
        } else {
          this.isUserLogin = false;
          this.userFirstName = '';
        }
      });

    this.store
      .select(selectCredentials)
      .subscribe((credentials) => (this.credentials = credentials));
  }

  onLogout($event) {
    const refreshToken = this.credentials.refreshToken;
    this.store.dispatch(actionSignOut({ refreshToken }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
