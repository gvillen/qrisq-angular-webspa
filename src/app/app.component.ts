// angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectSignedUser } from './features/identity/store/identity.selectors';

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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
