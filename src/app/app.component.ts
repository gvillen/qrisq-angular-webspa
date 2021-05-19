// angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { actionSignOut } from './features/identity/store/identity.actions';
import {
  CredentialsState,
  SignedUserState,
} from './features/identity/store/identity.models';
import {
  selectCredentials,
  selectSignedUser,
} from './features/identity/store/identity.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Qrisq';
  signedUser: SignedUserState;
  credentials: CredentialsState;

  public get isUserLogin(): boolean {
    return this.signedUser !== null;
  }

  public get userFirstName(): string {
    return this.signedUser !== null
      ? this.signedUser.user.firstName
      : 'not user';
  }

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectSignedUser)
      .subscribe((signedUser: SignedUserState) => {
        this.signedUser = signedUser;
      });

    this.store
      .select(selectCredentials)
      .subscribe((credentials: CredentialsState) => {
        this.credentials = credentials;
      });
  }

  onLogout($event) {
    const refreshToken = this.credentials.refreshToken;
    this.store.dispatch(actionSignOut({ refreshToken }));
  }
}
