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

import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectSignUp } from '../../store/identity.selectors';
import { QrGeocodingService } from '../../services/geocode.service';
import {
  actionCreateAccountRequest,
  actionSignUpAddressChanged,
} from '../../store/identity.actions';
import { SignUpState } from '../../store/identity.models';

@Component({
  selector: 'qrisq-register-geolocation-page',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css'],
})
export class QrGeolocationPageComponent implements OnInit {
  @ViewChild('mapMarker') googleMapMarker: ElementRef;
  lat: number;
  lng: number;
  formattedAddress: String;
  zoom: Number;
  pinMoveAttempts: Number;
  infoPopoverVisible: Boolean;
  pinAttemptsModalVisible: Boolean;

  constructor(
    private geocodingService: QrGeocodingService,
    private store: Store
  ) {}

  signUp: SignUpState;
  signUp$ = this.store.select(selectSignUp);

  ngOnInit(): void {
    this.signUp$.subscribe((signUp) => {
      if (signUp) {
        this.lat = signUp.lattitude;
        this.lng = signUp.longitude;
        this.formattedAddress = signUp.addressFormatted;
        this.signUp = signUp;
      }
    });
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

    this.geocodingService
      .geocodeLocation(this.lat, this.lng)
      .pipe(take(1))
      .subscribe((address) => {
        this.store.dispatch(actionSignUpAddressChanged({ address }));
      });

    this.pinMoveAttempts = this.pinMoveAttempts.valueOf() + 1;
  }

  onInfoPopoverClose(event) {
    this.infoPopoverVisible = false;
  }

  onSubmit(event) {
    this.store.dispatch(actionCreateAccountRequest({ signUp: this.signUp }));
  }
}
