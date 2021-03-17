import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from './objects/address';
import axios from 'axios';
// import lambda from 'aws-lambda-invoke';

@Component({
  selector: 'HomeFalsePage',
  templateUrl: 'home-false.component.html',
  styleUrls: ['home-false.component.css'],
})
export class HomeFalseComponent implements OnInit {
  showSearchBox: boolean;

  showNotInServiceAreaMessage: boolean;

  showInServiceAreaMessage: boolean;

  lng: number;

  lat: number;

  constructor() {
    this.showSearchBox = true;
    this.showNotInServiceAreaMessage = false;
    this.showInServiceAreaMessage = false;
  }

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

    // axios({
    //   method: 'post',
    //   url: '/user/12345',
    //   data: {
    //     firstName: 'Fred',
    //     lastName: 'Flintstone',
    //   },
    // });

    const session_url =
      'http://ec2-3-84-30-229.compute-1.amazonaws.com/aws-lambda-latlon-in-service-area-client.html';
    const uname = 'jrusell';
    const pass = 'wind1234';

    axios
      .get(session_url, {
        auth: {
          username: uname,
          password: pass,
        },
      })
      .then(function (response) {
        console.log('Authenticated');
        console.log(response);
      })
      .catch(function (error) {
        console.log('Error on Authentication');
      });

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
