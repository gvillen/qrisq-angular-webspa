import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectCredentials } from '@app/features/identity/store/identity.selectors';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { QrIdentityService } from '@app/features/identity/services/identity.service';
import {
  actionAccessTokenRefreshed,
  actionSignOut,
} from '@app/features/identity/store/identity.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  protectedUrls = ['/storm-data', '/wind-data', '/surge-data'];

  constructor(
    private store: Store,
    private router: Router,
    private identityService: QrIdentityService
  ) {}

  addTokenToHeader(request: HttpRequest<any>, token): HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  isProtected(requestUrl): boolean {
    return this.protectedUrls.some((url) => requestUrl.includes(url));
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    if (this.isProtected(request.url)) {
      return this.store.select(selectCredentials).pipe(
        take(1),
        switchMap((credentials) => {
          if (!credentials) {
            this.router.navigate(['/identity/login']);
            return throwError('Unauthorized');
          } else {
            return next
              .handle(this.addTokenToHeader(request, credentials.accessToken))
              .pipe(
                catchError((error) => {
                  if (error && error.status === 401) {
                    return this.identityService
                      .refreshCredentials(credentials.refreshToken)
                      .pipe(
                        take(1),
                        switchMap((response: { access: string }) => {
                          this.store.dispatch(
                            actionAccessTokenRefreshed({
                              newAccessToken: response.access,
                            })
                          );
                          return next.handle(
                            this.addTokenToHeader(request, response.access)
                          );
                        }),
                        catchError((error) => {
                          this.store.dispatch(
                            actionSignOut({
                              refreshToken: credentials.refreshToken,
                            })
                          );
                          this.router.navigate(['/identity/login']);
                          return throwError(error);
                        })
                      );
                  }
                  return throwError(error);
                })
              );
          }
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
