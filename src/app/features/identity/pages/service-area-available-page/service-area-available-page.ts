import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { environment } from '@env';

import { concatMap, map, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { QrServiceAreaAvailableComponentStore } from './service-area-available-page.component-store';
import { QrIdentityService } from '../../services/identity.service';
import { actionRegisterStart } from '../../store/identity.actions';

const { API_URL } = environment;

@Component({
  selector: 'qr-service-area-available-page',
  templateUrl: './service-area-available-page.component.html',
  styleUrls: ['./service-area-available-page.component.css'],
})
export class QrServiceAreaAvailablePageComponent implements OnInit {
  constructor(
    private componentStore: QrServiceAreaAvailableComponentStore,
    private identityService: QrIdentityService,
    private store: Store
  ) {}

  readonly subscriptionPlans$ = this.componentStore.selectSubscriptionPlans$;

  readonly windOnly$ = this.componentStore.selectWindOnly$;

  ngOnInit(): void {
    this.componentStore.resetState();
  }

  public onRegister(planId: number): void {
    this.store.dispatch(actionRegisterStart({ subscriptionPlanId: planId }));
  }
}
