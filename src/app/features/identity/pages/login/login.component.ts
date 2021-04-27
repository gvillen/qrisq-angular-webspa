import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';

import { environment } from '@env';
import { IdentityService } from '@app/features/identity/sign-up/services/IdentityService.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'qrisq-identity-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class IdentityLoginPageComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private identityService: IdentityService,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      const data = {
        username: this.validateForm.get('username').value,
        password: this.validateForm.get('password').value,
      };

      this.identityService
        .authenticateUser(data.username, data.password)
        .subscribe(
          (user) => {
            this.router.navigate(['/hurricane-viewer/wind-risk']);
            this.notification.create(
              'success',
              'Login Success',
              'Welcome back ' + user.first_name,
              {
                nzPlacement: 'bottomRight',
              }
            );
          },
          (error) => {
            switch (error.status) {
              case 401:
                this.notification.create(
                  'error',
                  'Login Failed',
                  'Username or password invalid',
                  {
                    nzPlacement: 'bottomRight',
                  }
                );
                break;

              default:
                break;
            }
          }
        );

      // const loginApiUrl = API_URL + '/auth/login';

      // axios
      //   .post(loginApiUrl, data)
      //   .then((response) => {
      //     console.log(response);
      //     console.log(response.data);

      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    }
  }
}
