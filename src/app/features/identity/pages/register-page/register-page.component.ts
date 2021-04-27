// angular
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectSignUp } from '../../store/identity.selectors';
import { actionRegisterFormSubmit } from '../../store/identity.actions';
import { SignUp } from '../../models/identity.models';

@Component({
  selector: 'qr-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class QrRegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  signUp$: Observable<SignUp>;

  constructor(
    private fb: FormBuilder,    
    private store: Store
  ) {}

  ngOnInit(): void {
    this.signUp$ = this.store.pipe(select(selectSignUp));
    this.registerForm = this.buildFormGroup();
  }

  buildFormGroup(): FormGroup {    
    const passwordFieldValidator = (control: FormControl): { [s: string]: boolean } => {
      if (!control.value) {
        return { required: true };
      } else if (control.value !== this.registerForm.controls.password.value) {
        return { confirm: true, error: true };
      }
      return {};
    };

    const firstNameField = [null, [Validators.required]];
    const lastNameField =  [null, [Validators.required]];    
    const emailField = [null, [Validators.email, Validators.required]];    
    const passwordField = [null, [Validators.required, Validators.minLength(8)]];
    const checkPasswordField = [null, [Validators.required, passwordFieldValidator]];
    const phoneNumberField = [null, [Validators.required]];

    return this.fb.group({firstNameField, lastNameField, emailField, passwordField, checkPasswordField, phoneNumberField});    
  }

  submitForm(): void {
    for (const i in this.registerForm.controls) {
      this.registerForm.controls[i].markAsDirty();
      this.registerForm.controls[i].updateValueAndValidity();
    }
    if (this.registerForm.status === 'VALID') {
      const data = {
        firstName: this.registerForm.get('firstName').value,
        lastName: this.registerForm.get('lastName').value,
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value,
        phoneNumber: this.registerForm.get('phoneNumber').value,
      };
      this.store.dispatch(actionRegisterFormSubmit(data));
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.registerForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = ;
}
