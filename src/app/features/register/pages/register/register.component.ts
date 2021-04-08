// angular
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { ActivatedRoute, Router } from '@angular/router';
import { AgmGeocoder } from '@agm/core';

@Component({
  selector: 'qrisq-register-page',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterPageComponent implements OnInit {
  validateForm!: FormGroup;
  lat = '';
  lng = '';
  displayText = '';
  streetNumber = '';
  streetName = '';
  city = '';
  state = '';
  zip = '';

  planId = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private agmGeocoder: AgmGeocoder
  ) {}

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.status === 'VALID') {
      const params = {
        lat: this.lat,
        lng: this.lng,
        planId: this.planId,
        firstName: this.validateForm.get('firstName').value,
        lastName: this.validateForm.get('lastName').value,
        email: this.validateForm.get('email').value,
        password: this.validateForm.get('password').value,
        phoneNumber: this.validateForm.get('phoneNumber').value,
        displayText: this.displayText,
        streetNumber: this.streetNumber + ' ' + this.streetName,
        city: this.city,
        state: this.state,
        zip: this.zip,
      };
      this.router.navigate(['/register/payment', params]);
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  ngOnInit(): void {
    this.lat = this.route.snapshot.paramMap.get('lat');
    this.lng = this.route.snapshot.paramMap.get('lng');
    this.planId = this.route.snapshot.paramMap.get('planId');

    const latlng = new google.maps.LatLng(
      Number(this.lat).valueOf(),
      Number(this.lng).valueOf()
    );

    // reverse geocoding
    this.agmGeocoder.geocode({ location: latlng }).subscribe((result) => {
      if (result.length > 0) {
        const { address_components: components } = result[0];

        const includesStreetNumber = (c) => c.types.includes('street_number');
        const includesStreetName = (c) => c.types.includes('route');
        const includesCity = (c) => c.types.includes('locality');
        const includesState = (c) =>
          c.types.includes('administrative_area_level_1');
        const includesZip = (c) => c.types.includes('postal_code');

        if (components.some(includesStreetNumber)) {
          this.streetNumber = components.find(includesStreetNumber).long_name;
          this.displayText += this.streetNumber + ' ';
        }

        if (components.some(includesStreetName)) {
          this.streetName = components.find(includesStreetName).long_name;
          this.displayText += this.streetName + ', ';
        }

        if (components.some(includesCity)) {
          this.city = components.find(includesCity).long_name;
          this.displayText += this.city + ', ';
        }

        if (components.some(includesState)) {
          this.state = components.find(includesState).short_name;
          this.displayText += this.state + ', ';
        }

        if (components.some(includesZip)) {
          this.zip = components.find(includesZip).long_name;
          this.displayText += this.zip;
        }

        this.validateForm
          .get('streetAddress')
          .setValue(this.streetNumber + ' ' + this.streetName);
        this.validateForm.get('city').setValue(this.city);
        this.validateForm.get('state').setValue(this.state);
        this.validateForm.get('zip').setValue(this.zip);

        console.log(result[0].formatted_address);
        console.log(result[0].address_components);
      } else {
        console.log('Reverse Geocoding Failed!');
      }
    });

    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      phoneNumber: [null, [Validators.required]],
      streetAddress: [
        {
          value: this.streetNumber + ' ' + this.streetName,
          disabled: true,
        },
      ],
      city: [{ value: this.city, disabled: true }],
      state: [{ value: this.state, disabled: true }],
      zip: [{ value: this.zip, disabled: true }],
    });
  }
}
