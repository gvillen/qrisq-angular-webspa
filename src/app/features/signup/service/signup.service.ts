import { Guid } from 'guid-typescript';
import { AgmGeocoder } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { SignUp } from '../store/signup.models';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(
    private httpClient: HttpClient,
    private agmGeocoder: AgmGeocoder
  ) {}

  checkServiceArea(latitude: number, longitude: number) {
    return this.httpClient.post(
      environment.API_URL + '/check-service-area',
      {
        latitude,
        longitude,
      },
      { headers: { 'Content-type': 'application/json; charset=utf-8' } }
    );
  }

  fetchSubscriptionPlans() {
    return this.httpClient.get(environment.API_URL + '/subscription-plans', {
      headers: { 'Content-type': 'application/json; charset=utf-8' },
    });
  }

  geocodeLocation(lattitude: number, longitude: number) {
    const location = new google.maps.LatLng(lattitude, longitude);
    return this.agmGeocoder.geocode({ location });
  }

  createAccount(signUp: SignUp) {
    const data = {
      email: signUp.email,
      password: signUp.password,
      confirm_password: signUp.password,
      first_name: signUp.firstName,
      last_name: signUp.lastName,
      phone_number: signUp.phoneNumber,
      address: {
        lat: signUp.lattitude,
        lng: signUp.longitude,
        displayText: signUp.addressDisplayText,
      },
      street_number: signUp.addressStreetNumber,
      city: signUp.addressCity,
      state: signUp.addressState,
      zip_code: signUp.addressZip,
      subscription_plan_id: signUp.subscriptionPlanId,
      payment_id: Guid.create().toString().substr(0, 6),
    };

    return this.httpClient.post(environment.API_URL + '/auth/signup', data, {
      headers: { 'Content-type': 'application/json; charset=utf-8' },
    });
  }
}
