import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { environment } from '@env';

import { concatMap, map, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { QrIdentityService } from '../../services/identity.service';
import { actionRegisterStart } from '../../store/identity.actions';
import { selectSignUp } from '../../store/identity.selectors';

const { API_URL } = environment;

@Component({
  selector: 'qr-service-area-available-page',
  templateUrl: './service-area-available-page.component.html',
  styleUrls: ['./service-area-available-page.component.scss'],
})
export class QrServiceAreaAvailablePageComponent implements OnInit {
  constructor(
    private identityService: QrIdentityService,
    private store: Store
  ) {}

  windOnly$ = this.store.select(selectSignUp);
  subscriptionPlans$ = this.identityService.fetchSubscriptionPlans();

  ngOnInit(): void {}

  public onRegister(planId: number): void {
    this.store.dispatch(actionRegisterStart({ subscriptionPlanId: planId }));
  }
}
