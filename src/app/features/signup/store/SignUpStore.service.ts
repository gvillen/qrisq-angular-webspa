// angular
import { Injectable } from '@angular/core';

// rxjs
import { Observable, BehaviorSubject } from 'rxjs';

// schema
import { NewUser } from '../schema/models';

@Injectable({
  providedIn: 'root',
})
export class SignUpStore {
  constructor() {}

  private _initialState = {
    newUser: {
      firstName: '',
      lastName: '',
      password: '',
      phoneNumber: '',
      lat: 0,
      lng: 0,
      windServiceOnly: false,
      subscriptionPlan: {
        id: 0,
        name: '',
        price: 0,
      },
    },
  };

  private _newUser: BehaviorSubject<NewUser> = new BehaviorSubject(
    this._initialState.newUser
  );

  public get newUser(): Observable<NewUser> {
    return new Observable((fn) => this._newUser.subscribe(fn));
  }

  setNewUser(newUser: NewUser) {
    this._newUser.next(newUser);
  }

  resetNewUser() {
    this._newUser.next(this._initialState.newUser);
  }
}
