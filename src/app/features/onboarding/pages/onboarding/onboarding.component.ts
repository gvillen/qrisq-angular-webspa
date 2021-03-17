// angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// google
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

// objects
import { Address } from '../../objects/address';

// axios
import axios from 'axios';

@Component({
  selector: 'qrisq-onboarding-page',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css'],
})
export class OnboardingPageComponent implements OnInit {
  lng: number;

  lat: number;

  constructor(private router: Router) {}

  ngOnInit() {}

  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  public onChange(address: Address) {
    // if(address.photos && address.photos.length > 0){
    //     console.dir(address.photos[0].getUrl({maxHeight:500,maxWidth:500}));
    // }
    // let x = this.getComponentByType(address,"street_number");
    this.lng = address.geometry.location.lng();
    this.lat = address.geometry.location.lat();

    // console.log(address.geometry.location.lng());
    // console.log(address.geometry.location.lat());
    // console.log(address.geometry.location.toJSON());
    // console.log(address.geometry.viewport.getNorthEast());
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
        console.log(services);

        if (available) {
          this.router.navigate(['/onboarding/success', { onlyWind }]);
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
