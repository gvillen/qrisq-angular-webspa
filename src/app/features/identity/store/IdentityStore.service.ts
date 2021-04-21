import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { User, UserAddress, UserProfile } from '../schema/User';

@Injectable({
  providedIn: 'root',
})
export class IdentityStore {
  constructor() {}

  private _initialState = {
    user: {
      email: '',
      first_name: '',
      id: 0,
      last_name: '',
      profile: {
        address: {
          displayText: '',
          lat: '',
          lng: '',
        } as UserAddress,
        city: '',
        is_preprocessed: false,
        phone_number: '',
        state: '',
        street_number: '',
        zip_code: '',
      } as UserProfile,
    } as User,
    accessToken: '',
    refreshToken: '',
    isAuthenticated: false,
  };

  private _user: BehaviorSubject<User> = new BehaviorSubject(
    this._initialState.user
  );

  private _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(
    this._initialState.isAuthenticated
  );

  private _accessToken: string = this._initialState.accessToken;
  private _refreshToken: string = this._initialState.refreshToken;

  public get user(): Observable<User> {
    return new Observable((fn) => this._user.subscribe(fn));
  }

  setUser(user: User) {
    this._user.next(user);
    this._isAuthenticated.next(true);
  }

  public get isAuthenticated(): Observable<boolean> {
    return new Observable((fn) => this._isAuthenticated.subscribe(fn));
  }

  public get accessToken(): string {
    return this._accessToken;
  }
  public set accessToken(accessToken: string) {
    this._accessToken = accessToken;
  }

  public get refreshToken(): string {
    return this._refreshToken;
  }
  public set refreshToken(refreshToken: string) {
    this._refreshToken = refreshToken;
  }
}
