// angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// google
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

// environment
import { environment } from '@env';

// objects
import { Address } from '../../objects/address';

// axios
import axios from 'axios';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

const { API_URL } = environment;

@Component({
  selector: 'qrisq-onboarding-page',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css'],
})
export class OnboardingPageComponent implements OnInit {
  lng: number;

  lat: number;

  formattedAddress: string;

  addressSelected = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {}

  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  public onAddressChange(address: Address) {
    this.lng = address.geometry.location.lng();
    this.lat = address.geometry.location.lat();
    this.formattedAddress = address.formatted_address;

    this.addressSelected = true;
  }

  onInputChange(event) {
    console.log(event);
  }

  public OnSearch() {
    console.log('OnSearch');

    const checkServiceAreaApiUrl = API_URL + '/check-service-area';

    axios
      .post(checkServiceAreaApiUrl, {
        latitude: this.lat,
        longitude: this.lng,
      })
      .then((response) => {
        const { data } = response;
        const { available } = data;

        if (!available) {
          this.router.navigate(['/onboarding/unavailable']);
          return;
        }

        this.router.navigate([
          '/onboarding/success',
          {
            lng: this.lng,
            lat: this.lat,
            onlyWind: !data.services.includes('surge'),
          },
        ]);
      })
      .catch(function (error) {
        console.log(error);
      });

    // axios({
    //   method: 'post',
    //   url: '/user/12345',
    //   data: {
    //     firstName: 'Fred',
    //     lastName: 'Flintstone',
    //   },
    // });

    // const session_url =
    //   '';
    // const uname = 'jrusell';
    // const pass = 'wind1234';

    // axios
    //   .post('',

    //   )
    //   .then(function (response) {
    //     console.log('Authenticated');
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log('Error on Authentication');
    //   });

    // if (this.lng === -1.826215 && this.lat === 51.17888199999999) {
    //   this.showSearchBox = false;
    //   this.showInServiceAreaMessage = true;
    // } else {
    //   this.showSearchBox = false;
    //   this.showNotInServiceAreaMessage = true;
    // }

    // fetch("http://localhost:3002")
    //     .then((resp) => console.log(resp));

    // const apiUrl = `http://localhost:3002/api/check-service-area?lat=${this.lat}&lng=${this.lng}`;
    // fetch(apiUrl)
    //     .then((resp) => resp.json())
    //     .then(function(data) {
    //         console.log(data);
    //         // alert(data);
    //     })
    //     .catch(function(error) {
    //         console.log(error);
    //     });
    // // lambda.invoke('aws-lambda-latlon-in-service-area', {latitude: 30.0, longitude: -90.0}).then(result => {
    // //     console.log(result);2
    // //     // => '{"foo": "bar"}'
    // // });
    // // alert(`Longitude: ${this.lng} - Lattitude: ${this.lat}`);
  }
}
