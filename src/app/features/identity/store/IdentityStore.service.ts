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
      firstName: '',
      id: 0,
      lastName: '',
      profile: {
        address: {
          displayText: '',
          lat: '',
          lng: '',
        } as UserAddress,
        city: '',
        isPreprocessed: false,
        phoneNumber: '',
        state: '',
        streetNumber: '',
        zipCode: '',
      } as UserProfile,
    } as User,
    accessToken: '',
    refreshToken: '',
    isAuthenticated: false,
  };

  private _user: User = this._initialState.user;
  private _accessToken: string = this._initialState.accessToken;
  private _refreshToken: string = this._initialState.refreshToken;
  private _isAuthenticated: boolean = this._initialState.isAuthenticated;

  public get user(): User {
    return this._user;
  }
  public set user(user: User) {
    this._user = user;
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

  public get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
  public set isAuthenticated(v: boolean) {
    this._isAuthenticated = v;
  }
}
