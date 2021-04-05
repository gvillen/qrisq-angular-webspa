import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';

import axios from 'axios';

import { environment } from '@env';

const { API_URL } = environment;

@Component({
  selector: 'qrisq-identity-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class IdentityLoginPageComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

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
      const loginApiUrl = API_URL + '/auth/login';
      const data = {
        email: this.validateForm.get('username').value,
        password: this.validateForm.get('password').value,
      };

      axios
        .post(loginApiUrl, data)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          this.router.navigate(['/home']);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}
