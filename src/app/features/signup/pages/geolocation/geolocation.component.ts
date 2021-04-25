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
import { take } from 'rxjs/operators';

@Component({
  selector: 'qrisq-register-geolocation-page',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css'],
})
export class RegisterGeolocationPageComponent implements OnInit {
  @ViewChild('mapMarker') googleMapMarker: ElementRef;
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
    private agmGeocoder: AgmGeocoder,
    private signUpService: SignUpService
  ) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.signUpService
      .getNewUser()
      .pipe(take(1))
      .subscribe((newUser) => {
        this.newUser = newUser;
        this.lat = newUser.lat;
        this.lng = newUser.lng;
        this.formattedAddress = newUser.address.formattedAddress;
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

    this.signUpService
      .geocodeLocation(this.lat, this.lng)
      .pipe(take(1))
      .subscribe((newUserAddress) => {
        this.newUser.address = newUserAddress;
        this.formattedAddress = newUserAddress.formattedAddress;
      });

    this.pinMoveAttempts = this.pinMoveAttempts.valueOf() + 1;
  }

  onInfoPopoverClose(event) {
    this.infoPopoverVisible = false;
  }

  onSubmit(event) {
    this.signUpService
      .registerNewUser(this.newUser)
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.router.navigate(['/sign-up/account-created']);
        } else {
          console.log('error');
        }
      });
  }
}
