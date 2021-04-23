import { NewUserSubscriptionPlan } from './../../schema/models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { environment } from '@env';
import { SignUpService } from '../../service/SignUpService.service';
import { NewUser } from '../../schema/models';

const { API_URL } = environment;

@Component({
  selector: 'qrisq-signup-service-area-available-page',
  templateUrl: './service-area-available.component.html',
  styleUrls: ['./service-area-available.component.css'],
})
export class SignUpServiceAreaAvailablePageComponent implements OnInit {
  loading = false;
  subscriptionPlans: Array<NewUserSubscriptionPlan>;
  newUser: NewUser;
  windServiceOnly: boolean;

  constructor(
    private signUpService: SignUpService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.signUpService.getNewUser().subscribe((newUser) => {
      this.newUser = newUser;
      this.windServiceOnly = newUser.windServiceOnly;
    });

    this.loading = true;

    this.signUpService
      .fetchSubscriptionPlans()
      .subscribe((subscriptionPlans) => {
        this.subscriptionPlans = subscriptionPlans;
        this.loading = false;
      });
  }

  public onRegister(planId) {
    this.newUser.subscriptionPlan = this.subscriptionPlans.find(
      (sp) => sp.id === planId
    );
    this.signUpService.setNewUser(this.newUser);
    this.router.navigate(['/sign-up/register']);
  }
}
