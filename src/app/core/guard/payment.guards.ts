import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { selectSignedUser } from '@app/features/identity/store/identity.selectors';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

@Injectable()
export class PaymentGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store
      .select(selectSignedUser)
      .pipe(
        take(1),
        map((signedUser) => signedUser.user.hasPaid)
      )
      .subscribe((hasPaid) => {
        if (!hasPaid) {
          this.router.navigate(['identity/sign-up/payment']);
          return false;
        } else {
          return true;
        }
      });

    return true;
  }
}
