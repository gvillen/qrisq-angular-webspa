import { NewUserSubscriptionPlan } from './../../schema/models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { environment } from '@env';
import { SignUpService } from '../../service/SignUpService.service';
import { NewUser } from '../../schema/models';
import { take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import {
  actionFetchSubscriptionPlanListRequest,
  actionRegisterStart,
} from '../../store/signup.actions';
import { Observable } from 'rxjs';
import { SubscriptionPlan } from '../../store/signup.models';
import { selectSubscriptionPlans } from '../../store/signup.selectors';
const { API_URL } = environment;

@Component({
  selector: 'qrisq-signup-service-area-available-page',
  templateUrl: './service-area-available.component.html',
  styleUrls: ['./service-area-available.component.css'],
})
export class SignUpServiceAreaAvailablePageComponent implements OnInit {
  loading: boolean;
  subscriptionPlans$: Observable<SubscriptionPlan[]>;
  newUser: NewUser;
  windServiceOnly: boolean;

  constructor(
    private signUpService: SignUpService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.subscriptionPlans$ = this.store.pipe(select(selectSubscriptionPlans));
    this.store.dispatch(actionFetchSubscriptionPlanListRequest());
  }

  public onRegister(planId: number) {
    this.store.dispatch(actionRegisterStart({ subscriptionPlanId: planId }));
  }
}
