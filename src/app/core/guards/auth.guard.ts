// angular
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

// store, ngrx, rxjs
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

// state
import { CredentialsState } from '@app/features/identity/store/identity.models';
import { selectCredentials } from '@app/features/identity/store/identity.selectors';

@Injectable()
export class QrAuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(selectCredentials).pipe(
      take(1),
      map((credentials: CredentialsState) => {
        if (!credentials) {
          this.router.navigate(['/identity/login']);
        }
        return credentials.isAuthenticated;
      })
    );
  }
}
