import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { environment } from '@env';

const { API_URL } = environment;

@Component({
  selector: 'qrisq-onboarding-success-page',
  templateUrl: './onboarding-success.component.html',
  styleUrls: ['./onboarding-success.component.css'],
})
export class OnboardingSuccessPageComponent implements OnInit {
  onlyWind = false;

  lat = '';

  lng = '';

  formattedAddress = '';

  response: any;

  subscriptionPlans = [];

  loading = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.onlyWind = this.route.snapshot.paramMap.get('onlyWind') === 'true';
    this.lat = this.route.snapshot.paramMap.get('lat');
    this.lng = this.route.snapshot.paramMap.get('lng');
    this.formattedAddress = this.route.snapshot.paramMap.get(
      'formattedAddress'
    );
    this.loading = true;

    const getSubscriptionPlansApiUrl = API_URL + '/subscription-plans';
    axios
      .get(getSubscriptionPlansApiUrl)
      .then((response) => {
        const { data } = response;
        console.log(response);
        console.log(data);
        this.loading = false;
        this.subscriptionPlans = data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  public onRegister(planId) {
    const lat = this.lat;
    const lng = this.lng;
    const formattedAddress = this.formattedAddress;
    this.router.navigate(['/register', { lat, lng, formattedAddress, planId }]);
  }
}
