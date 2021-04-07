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

@Component({
  selector: 'qrisq-register-page',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  validateForm!: FormGroup;

  lat = '';

  lng = '';

  formattedAddress = '';

  planId = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
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
        formattedAddress: this.formattedAddress,
        planId: this.planId,
        firstName: this.validateForm.get('firstName').value,
        lastName: this.validateForm.get('lastName').value,
        email: this.validateForm.get('email').value,
        password: this.validateForm.get('password').value,
        phoneNumber: this.validateForm.get('phoneNumber').value,
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
    this.formattedAddress = this.route.snapshot.paramMap.get(
      'formattedAddress'
    );
    this.planId = this.route.snapshot.paramMap.get('planId');

    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      phoneNumber: [null, [Validators.required]],
      serviceAddress: [
        { value: this.formattedAddress, disabled: true },
        [Validators.required],
      ],
    });
  }
}
