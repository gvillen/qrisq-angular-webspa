import { NewUserAddress, NewUserSubscriptionPlan } from './../schema/models';
// angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// rxjs
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

// schema
import { CheckServiceAreaResponse } from '../schema/HttpResponse';

// services
import { SignUpStore } from '../store/SignUpStore.service';

// environment
import { environment } from '@env';
import { NewUser } from '../schema/models';
import { AgmGeocoder } from '@agm/core';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(
    private httpClient: HttpClient,
    private signUpStore: SignUpStore,
    private agmGeocoder: AgmGeocoder
  ) {}

  resetNewUser() {
    this.signUpStore.resetNewUser();
  }

  getNewUser(): Observable<NewUser> {
    return this.signUpStore.newUser;
  }

  setNewUser(newUser: NewUser) {
    this.signUpStore.setNewUser(newUser);
  }

  checkServiceArea(
    lat: number,
    lng: number
  ): Observable<CheckServiceAreaResponse> {
    return new Observable((observer) => {
      const url = environment.API_URL + '/check-service-area';
      const data = { latitude: lat, longitude: lng };
      this.httpClient
        .post<CheckServiceAreaResponse>(url, data)
        .pipe(take(1))
        .subscribe(
          (response) => {
            observer.next(response);
          },
          (error) => {
            console.log(error);
            observer.error(error);
          }
        );
    });
  }

  fetchSubscriptionPlans(): Observable<Array<NewUserSubscriptionPlan>> {
    return new Observable((observer) => {
      const url = environment.API_URL + '/subscription-plans';
      this.httpClient
        .get<Array<NewUserSubscriptionPlan>>(url)
        .pipe(take(1))
        .subscribe(
          (subscriptionPlans) => {
            observer.next(subscriptionPlans);
          },
          (error) => {
            console.log(error);
            observer.error(error);
          }
        );
    });
  }

  geocodeLocation(lat: number, lng: number): Observable<NewUserAddress> {
    return new Observable((observer) => {
      // reverse geocoding
      const location = new google.maps.LatLng(lat, lng);
      this.agmGeocoder
        .geocode({ location })
        .pipe(take(1))
        .subscribe((result) => {
          if (result.length > 0) {
            let _newUserAddress: NewUserAddress = {
              formattedAddress: '',
              displayText: '',
              city: '',
              state: '',
              streetName: '',
              streetNumber: '',
              zip: '',
            };

            _newUserAddress.formattedAddress = result[0].formatted_address;

            const { address_components: components } = result[0];
            const includesStreetNumber = (c) =>
              c.types.includes('street_number');
            const includesStreetName = (c) => c.types.includes('route');
            const includesCity = (c) => c.types.includes('locality');
            const includesState = (c) =>
              c.types.includes('administrative_area_level_1');
            const includesZip = (c) => c.types.includes('postal_code');

            if (components.some(includesStreetNumber)) {
              _newUserAddress.streetNumber = components.find(
                includesStreetNumber
              ).long_name;
              _newUserAddress.displayText += _newUserAddress.streetNumber + ' ';
            }

            if (components.some(includesStreetName)) {
              _newUserAddress.streetName = components.find(
                includesStreetName
              ).long_name;
              _newUserAddress.displayText += _newUserAddress.streetName + ', ';
            }

            if (components.some(includesCity)) {
              _newUserAddress.city = components.find(includesCity).long_name;
              _newUserAddress.displayText += _newUserAddress.city + ', ';
            }

            if (components.some(includesState)) {
              _newUserAddress.state = components.find(includesState).short_name;
              _newUserAddress.displayText += _newUserAddress.state + ', ';
            }

            if (components.some(includesZip)) {
              _newUserAddress.zip = components.find(includesZip).long_name;
              _newUserAddress.displayText += _newUserAddress.zip;
            }

            observer.next(_newUserAddress);
          }
        });
    });
  }

  registerNewUser(newUser: NewUser): Observable<boolean> {
    return new Observable((observer) => {
      const url = environment.API_URL + '/auth/signup';

      const data = {
        email: newUser.email,
        password: newUser.password,
        confirm_password: newUser.password,
        first_name: newUser.firstName,
        last_name: newUser.lastName,
        phone_number: newUser.phoneNumber,
        address: {
          lat: newUser.lat,
          lng: newUser.lng,
          displayText: newUser.address.displayText,
        },
        street_number: newUser.address.streetNumber,
        city: newUser.address.city,
        state: newUser.address.state,
        zip_code: newUser.address.zip,
        subscription_plan_id: newUser.subscriptionPlan.id,
        payment_id: newUser.paymentId,
      };

      this.httpClient
        .post<Response>(url, data)
        .pipe(take(1))
        .subscribe(
          (response) => {
            observer.next(true);
            // if (response.ok) {

            // } else {
            //   observer.error(response.text);
            // }
          },
          (error) => {
            observer.error(error);
            console.log(error);
          }
        );
    });
  }
}
