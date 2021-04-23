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
import { SignUpService } from '../../service/SignUpService.service';
import { NewUser } from '../../schema/models';

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

  lat: number;
  lng: number;
  formattedAddress: String;
  zoom: Number;
  pinMoveAttempts: Number;
  infoPopoverVisible: Boolean;
  pinAttemptsModalVisible: Boolean;
  newUser: NewUser;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private agmGeocoder: AgmGeocoder,
    private signUpService: SignUpService
  ) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.signUpService.getNewUser().subscribe((newUser) => {
      this.newUser = newUser;
      this.lat = newUser.lat;
      this.lng = newUser.lng;
    });
    this.zoom = 20;
    this.pinMoveAttempts = 1;
    this.infoPopoverVisible = false;
    this.pinAttemptsModalVisible = false;

    const latlng = new google.maps.LatLng(this.lat, this.lng);

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

    const latlng = new google.maps.LatLng(this.lat, this.lng);

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
    this.signUpService.registerNewUser(this.newUser).subscribe((result) => {
      if (result) {
        this.router.navigate(['/sign-up/account-created']);
      } else {
        console.log('error');
      }
    });
  }
}
