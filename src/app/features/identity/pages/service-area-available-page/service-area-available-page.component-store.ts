import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SubscriptionPlan } from '../../models/identity.models';
import { QrIdentityService } from '../../services/identity.service';
import { selectSignUp } from '../../store/identity.selectors';

export interface QrServiceAreaAvailableState {
  subscriptionPlans: SubscriptionPlan[];
}

export const DEFAULT_STATE: QrServiceAreaAvailableState = {
  subscriptionPlans: [],
};

@Injectable()
export class QrServiceAreaAvailableComponentStore extends ComponentStore<QrServiceAreaAvailableState> {
  constructor(
    private store: Store,
    private identityService: QrIdentityService
  ) {
    super(DEFAULT_STATE);
  }

  readonly selectWindOnly$ = this.select(
    this.store.select(selectSignUp, (signUp) => signUp.windOnly)
  );

  readonly selectSubscriptionPlans$ = this.select(
    this.identityService.fetchSubscriptionPlans().pipe(take(1))
  );

  resetState(): void {
    this.setState(DEFAULT_STATE);
  }
}
