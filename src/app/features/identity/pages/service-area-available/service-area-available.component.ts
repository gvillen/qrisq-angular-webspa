// angular
import { Component, OnInit } from '@angular/core';

// store
import { Store } from '@ngrx/store';
import { actionRegisterStart } from '../../store/identity.actions';

import { QrIdentityService } from '../../services/identity.service';
import { selectSignUp } from '../../store/identity.selectors';

@Component({
  selector: 'qr-service-area-available-page',
  templateUrl: './service-area-available.component.html',
  styleUrls: ['./service-area-available.component.scss'],
})
export class QrServiceAreaAvailablePageComponent implements OnInit {
  constructor(
    private identityService: QrIdentityService,
    private store: Store
  ) {}

  signUp$ = this.store.select(selectSignUp);
  subscriptionPlans$ = this.identityService.fetchSubscriptionPlans();

  ngOnInit(): void {}

  public onRegister(planId: number): void {
    this.store.dispatch(actionRegisterStart({ subscriptionPlanId: planId }));
  }
}
