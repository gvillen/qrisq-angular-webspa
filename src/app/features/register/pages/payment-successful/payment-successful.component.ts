import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'qrisq-payment-successful',
  templateUrl: './payment-successful.component.html',
  styleUrls: ['./payment-successful.component.css'],
})
export class RegisterPaymentSuccessfulPageComponent implements OnInit {
  registerData = {
    lat: '',
    lng: '',
    formattedAddress: '',
    planId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    paymentId: '',
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.registerData.lat = this.route.snapshot.paramMap.get('lat');
    this.registerData.lng = this.route.snapshot.paramMap.get('lng');
    this.registerData.formattedAddress = this.route.snapshot.paramMap.get(
      'formattedAddress'
    );
    this.registerData.planId = this.route.snapshot.paramMap.get('planId');
    this.registerData.firstName = this.route.snapshot.paramMap.get('firstName');
    this.registerData.lastName = this.route.snapshot.paramMap.get('lastName');
    this.registerData.email = this.route.snapshot.paramMap.get('email');
    this.registerData.password = this.route.snapshot.paramMap.get('password');
    this.registerData.phoneNumber = this.route.snapshot.paramMap.get(
      'phoneNumber'
    );
    this.registerData.paymentId = this.route.snapshot.paramMap.get('paymentId');
  }

  onRegisterSubmit() {
    const signUpApiUrl = 'http://3.210.78.109/api/auth/signup';
    const data = {
      email: this.registerData.email,
      password: this.registerData.password,
      confirm_password: this.registerData.password,
      first_name: this.registerData.firstName,
      last_name: this.registerData.lastName,
      phone_number: this.registerData.phoneNumber,
      address: {
        lat: this.registerData.lat,
        lng: this.registerData.lng,
        displayText: this.registerData.formattedAddress,
      },
      street_number: '123',
      city: 'city',
      state: 'state',
      zip_code: '99999',
      subscription_plan_id: this.registerData.planId,
      payment_id: this.registerData.paymentId,
    };
    axios
      .post(signUpApiUrl, data)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        this.router.navigate(['/register/account-created']);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
