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
import { SignUpService } from '../../service/SignUpService.service';
import { NewUser } from '../../schema/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'qrisq-sign-up-register-page',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class SignUpRegisterPageComponent implements OnInit {
  validateForm!: FormGroup;
  newUser: NewUser;
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,

    private signUpService: SignUpService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      phoneNumber: [null, [Validators.required]],
      streetAddress: [{ value: null, disabled: true }],
      city: [{ value: null, disabled: true }],
      state: [{ value: null, disabled: true }],
      zip: [{ value: null, disabled: true }],
    });

    this.signUpService.getNewUser().subscribe((newUser) => {
      this.newUser = newUser;
      const sub$ = this.signUpService
        .geocodeLocation(this.newUser.lat, this.newUser.lng)
        .subscribe((address) => {
          this.validateForm.controls['streetAddress'].setValue(
            address.streetNumber + ' ' + address.streetName
          );
          this.validateForm.controls['city'].setValue(address.city);
          this.validateForm.controls['state'].setValue(address.state);
          this.validateForm.controls['zip'].setValue(address.zip);
          this.newUser.address = address;
          this.signUpService.setNewUser(this.newUser);
        });
      this.subscriptions.push(sub$);
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.status === 'VALID') {
      this.newUser.firstName = this.validateForm.get('firstName').value;
      this.newUser.lastName = this.validateForm.get('lastName').value;
      this.newUser.email = this.validateForm.get('email').value;
      this.newUser.password = this.validateForm.get('password').value;
      this.newUser.phoneNumber = this.validateForm.get('phoneNumber').value;
      this.signUpService.setNewUser(this.newUser);
      this.router.navigate(['/sign-up/payment']);
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
}
