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

const { API_URL } = environment;

@Component({
  selector: 'qrisq-onboarding-page',
  templateUrl: './check-service-area.component.html',
  styleUrls: ['./check-service-area.component.css'],
})
export class SignUpCheckServiceAreaPageComponent implements OnInit {
  lng: number;
  lat: number;
  formattedAddress: string;

  addressSelected = false;

  constructor(
    private signUpService: SignUpService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  ngOnInit() {
    this.signUpService.resetNewUser();
  }

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
    this.signUpService
      .checkServiceArea(this.lat, this.lng)
      .subscribe((response) => {
        if (response.available) {
          const newUser: NewUser = {
            lat: this.lat,
            lng: this.lng,
            windServiceOnly: !response.services.includes('surge'),
          };
          this.signUpService.setNewUser(newUser);
          this.router.navigate(['/sign-up/service-area-available']);
        }
      });
  }
}
