import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env';
import { HttpResponseUser, User } from '../schema/User';
import { IdentityStore } from '../store/IdentityStore.service';

const { API_URL } = environment;

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor(private http: HttpClient, private store: IdentityStore) {}

  authenticateUser(username: string, password: string): Observable<User> {
    return new Observable((observer) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };

      const data = {
        email: username,
        password,
      };

      this.http
        .post<HttpResponseUser>(API_URL + '/auth/login', data, options)
        .subscribe(
          (response) => {
            // if (response.status === 200) {
            //   const {
            //     user_info: user,
            //     access,
            //     refresh,
            //   }: {
            //     user_info: User;
            //     access: string;
            //     refresh: string;
            //   } = response.body;

            // this.store.accessToken = access;
            // this.store.refreshToken = refresh;
            console.log(response);
            console.log(response.user_info);
            this.store.setUser(response.user_info);
            observer.next(response.user_info);
          },
          (error) => {
            observer.error(error);
          }
        );
    });
  }

  getUser(): Observable<User> {
    return this.store.user;
  }

  isUserLogin(): Observable<boolean> {
    return this.store.isAuthenticated;
  }
}
