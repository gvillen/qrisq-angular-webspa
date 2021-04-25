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
import { take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SignUp } from '../../store/signup.models';
import { selectSignUp } from '../../store/signup.selectors';
import { actionRegisterFormSubmit } from '../../store/signup.actions';

@Component({
  selector: 'qrisq-sign-up-register-page',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class SignUpRegisterPageComponent implements OnInit {
  validateForm!: FormGroup;
  newUser: NewUser;

  signUp$: Observable<SignUp>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private signUpService: SignUpService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.signUp$ = this.store.pipe(select(selectSignUp));

    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      phoneNumber: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.status === 'VALID') {
      const data = {
        firstName: this.validateForm.get('firstName').value,
        lastName: this.validateForm.get('lastName').value,
        email: this.validateForm.get('email').value,
        password: this.validateForm.get('password').value,
        phoneNumber: this.validateForm.get('phoneNumber').value,
      };
      this.store.dispatch(actionRegisterFormSubmit(data));
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
