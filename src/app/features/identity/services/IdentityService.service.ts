import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env';
import { User } from '../schema/User';
import { IdentityStore } from '../store/IdentityStore.service';

const { API_URL } = environment;

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor(private http: HttpClient, private identityStore: IdentityStore) {}

  authenticateUser(
    username: string,
    password: string
  ): Observable<HttpResponse<any>> {
    return new Observable((observer) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        observe: 'response' as 'body',
      };

      const data = {
        email: username,
        password,
      };

      this.http
        .post<HttpResponse<any>>(API_URL + '/auth/login', data, options)
        .subscribe(
          (response) => {
            if (response.status === 200) {
              const {
                user_info: user,
                access,
                refresh,
              }: {
                user_info: User;
                access: string;
                refresh: string;
              } = response.body;
              this.identityStore.user = user;
              this.identityStore.accessToken = access;
              this.identityStore.refreshToken = refresh;
              this.identityStore.isAuthenticated = true;
            }
            observer.next(response);
          },
          (error) => {
            observer.error(error);
          }
        );
    });
  }

  isAuthenticated() {
    return this.identityStore.isAuthenticated;
  }

  getUser() {
    return this.identityStore.user;
  }
}
