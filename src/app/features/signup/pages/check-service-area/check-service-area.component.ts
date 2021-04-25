import { actionCheckServiceAreaRequest } from './../../store/signup.actions';
// angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// google
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

// environment
import { environment } from '@env';

// objects
import { Address } from '../../schema/address';

import { FormBuilder } from '@angular/forms';
import { SignUpService } from '../../service/SignUpService.service';
import { NewUser } from '../../schema/models';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { SignUpCheckServiceAreaRequestAction } from '../../store/signup.actions';

const { API_URL } = environment;

@Component({
  selector: 'qrisq-onboarding-page',
  templateUrl: './check-service-area.component.html',
  styleUrls: ['./check-service-area.component.css'],
})
export class SignUpCheckServiceAreaPageComponent implements OnInit {
  lng: number;
  lat: number;
  addressSelected = false;

  constructor(
    private signUpService: SignUpService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  ngOnInit() {
    this.signUpService.resetNewUser();
  }

  public onAddressChange(address: Address) {
    this.lng = address.geometry.location.lng();
    this.lat = address.geometry.location.lat();
    this.addressSelected = true;
  }

  public OnSearch() {
    this.store.dispatch(
      actionCheckServiceAreaRequest({
        lattitude: this.lat,
        longitude: this.lng,
      })
    );

    // this.signUpService
    //   .checkServiceArea(this.lat, this.lng)
    //   .pipe(take(1))
    //   .subscribe((response) => {
    //     if (response.available) {
    //       const newUser: NewUser = {
    //         lat: this.lat,
    //         lng: this.lng,
    //         windServiceOnly: !response.services.includes('surge'),
    //       };
    //       this.signUpService.setNewUser(newUser);
    //       this.router.navigate(['/sign-up/service-area-available']);
    //     }
    //   });
  }
}
