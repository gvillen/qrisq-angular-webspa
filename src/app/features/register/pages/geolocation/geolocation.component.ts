import { AgmGeocoder, MapsAPILoader } from '@agm/core';
import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LatLang,
  OverLayOption,
  MarkerOption,
  Shape,
  Marker,
  Circle,
} from 'ngx-google-map-helper';

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
    formattedAddress: '',
    planId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    paymentId: '',
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
    this.registerData.formattedAddress = this.route.snapshot.paramMap.get(
      'formattedAddress'
    );
    this.registerData.planId = this.route.snapshot.paramMap.get('planId');
    this.registerData.firstName = this.route.snapshot.paramMap.get('firstName');
    this.registerData.lastName = this.route.snapshot.paramMap.get('lastName');
    this.registerData.email = this.route.snapshot.paramMap.get('email');
    this.registerData.password = this.route.snapshot.paramMap.get('password');
    this.registerData.phoneNumber = this.route.snapshot.paramMap.get(
      'phoneNumber'
    );
    this.registerData.paymentId = this.route.snapshot.paramMap.get('paymentId');

    this.lat = Number(this.registerData.lat);
    this.lng = Number(this.registerData.lng);
    this.formattedAddress = this.registerData.formattedAddress;
    this.zoom = 20;
    this.pinMoveAttempts = 1;
    this.infoPopoverVisible = false;
    this.pinAttemptsModalVisible = false;
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
    this.router.navigate(['/register/account-created']);
  }
}
