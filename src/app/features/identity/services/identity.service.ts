import { Guid } from 'guid-typescript';
import { AgmGeocoder } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { SignUpState } from '../store/identity.models';

@Injectable({
  providedIn: 'root',
})
export class QrIdentityService {
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

  createAccount(signUp: SignUpState) {
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

  signIn(username: string, password: string) {
    return this.httpClient.post(
      environment.API_URL + '/auth/login',
      {
        email: username,
        password,
      },
      {
        headers: { 'Content-type': 'application/json; charset=utf-8' },
      }
    );
  }

  verifyEmail(email: string) {
    return this.httpClient.post(
      environment.API_URL + '/verify-email',
      {
        email: email,
      },
      {
        headers: { 'Content-type': 'application/json; charset=utf-8' },
      }
    );
  }
}
