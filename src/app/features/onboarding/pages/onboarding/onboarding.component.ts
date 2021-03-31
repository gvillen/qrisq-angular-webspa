// angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// google
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

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

    const checkServiceAreaApiUrl = 'http://3.210.78.109/api/check-service-area';

    axios
      .post(checkServiceAreaApiUrl, {
        latitude: this.lat,
        longitude: this.lng,
      })
      .then((response) => {
        const { data } = response;
        const { available, services } = data;

        const wind = services.includes('wind');
        const surge = services.includes('surge');
        const onlyWind = !(wind && surge);
        const lng = this.lng;
        const lat = this.lat;
        const formattedAddress = this.formattedAddress;
        console.log(services);

        if (available) {
          this.router.navigate([
            '/onboarding/success',
            { onlyWind, lng, lat, formattedAddress },
          ]);
        } else {
          this.router.navigate(['/onboarding/unavailable']);
        }
        console.log(response);
        console.log(response.data);
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
