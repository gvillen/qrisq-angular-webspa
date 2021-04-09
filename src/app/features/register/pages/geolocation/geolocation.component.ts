import { AgmGeocoder, MapsAPILoader } from '@agm/core';
import axios from 'axios';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '@env';

const { API_URL } = environment;

@Component({
  selector: 'qrisq-register-geolocation-page',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css'],
})
export class RegisterGeolocationPageComponent implements OnInit {
  @ViewChild('mapMarker') googleMapMarker: ElementRef;

  registerData = {
    lat: '',
    lng: '',
    planId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    paymentId: '',
    displayText: '',
    streetNumber: '',
    city: '',
    state: '',
    zip: '',
  };

  lat: Number;
  lng: Number;
  formattedAddress: String;
  zoom: Number;
  pinMoveAttempts: Number;
  infoPopoverVisible: Boolean;
  pinAttemptsModalVisible: Boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private mapsAPILoader: MapsAPILoader,
    private agmGeocoder: AgmGeocoder
  ) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.registerData.lat = this.route.snapshot.paramMap.get('lat');
    this.registerData.lng = this.route.snapshot.paramMap.get('lng');
    this.registerData.planId = this.route.snapshot.paramMap.get('planId');
    this.registerData.firstName = this.route.snapshot.paramMap.get('firstName');
    this.registerData.lastName = this.route.snapshot.paramMap.get('lastName');
    this.registerData.email = this.route.snapshot.paramMap.get('email');
    this.registerData.password = this.route.snapshot.paramMap.get('password');
    this.registerData.phoneNumber = this.route.snapshot.paramMap.get(
      'phoneNumber'
    );
    this.registerData.displayText = this.route.snapshot.paramMap.get(
      'displayText'
    );
    this.registerData.streetNumber = this.route.snapshot.paramMap.get(
      'streetNumber'
    );
    this.registerData.city = this.route.snapshot.paramMap.get('city');
    this.registerData.state = this.route.snapshot.paramMap.get('state');
    this.registerData.zip = this.route.snapshot.paramMap.get('zip');
    this.registerData.paymentId = this.route.snapshot.paramMap.get('paymentId');

    this.lat = Number(this.registerData.lat);
    this.lng = Number(this.registerData.lng);

    this.zoom = 20;
    this.pinMoveAttempts = 1;
    this.infoPopoverVisible = false;
    this.pinAttemptsModalVisible = false;

    const latlng = new google.maps.LatLng(
      this.lat.valueOf(),
      this.lng.valueOf()
    );

    this.agmGeocoder.geocode({ location: latlng }).subscribe((result) => {
      if (result.length > 0) {
        // console.log(result[0].address_components);
        this.formattedAddress = result[0].formatted_address;
      } else {
        this.formattedAddress = 'Reverse Geocoding Failed! Try again!';
        console.log('Reverse Geocoding Failed!');
      }
    });
  }

  onDragEnd(event: google.maps.MouseEvent) {
    if (this.pinMoveAttempts == 5) {
      this.pinAttemptsModalVisible = true;
      return;
    }

    this.lat = event.latLng.toJSON().lat;
    this.lng = event.latLng.toJSON().lng;

    const latlng = new google.maps.LatLng(
      this.lat.valueOf(),
      this.lng.valueOf()
    );

    this.agmGeocoder.geocode({ location: latlng }).subscribe((result) => {
      if (result.length > 0) {
        // console.log(result[0].address_components);
        this.formattedAddress = result[0].formatted_address;
      } else {
        this.formattedAddress = 'Reverse Geocoding Failed! Try again!';
        console.log('Reverse Geocoding Failed!');
      }
    });
    this.pinMoveAttempts = this.pinMoveAttempts.valueOf() + 1;
  }

  onInfoPopoverClose(event) {
    this.infoPopoverVisible = false;
  }

  onSubmit(event) {
    const signUpApiUrl = API_URL + '/auth/signup';

    const data = {
      email: this.registerData.email,
      password: this.registerData.password,
      confirm_password: this.registerData.password,
      first_name: this.registerData.firstName,
      last_name: this.registerData.lastName,
      phone_number: this.registerData.phoneNumber,
      address: {
        lat: this.registerData.lat,
        lng: this.registerData.lng,
        displayText: this.registerData.displayText,
      },
      street_number: this.registerData.streetNumber,
      city: this.registerData.city,
      state: this.registerData.state,
      zip_code: this.registerData.zip,
      subscription_plan_id: this.registerData.planId,
      payment_id: this.registerData.paymentId,
    };
    axios
      .post(signUpApiUrl, data)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        this.router.navigate(['/register/account-created']);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
