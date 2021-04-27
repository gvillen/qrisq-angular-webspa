import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'qrisq-payment-successful',
  templateUrl: './payment-successful.component.html',
  styleUrls: ['./payment-successful.component.scss'],
})
export class RegisterPaymentSuccessfulPageComponent implements OnInit {
  registerData = {
    lat: '',
    lng: '',
    planId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    paymentId: '',
    displayText: '',
    streetNumber: '',
    city: '',
    state: '',
    zip: '',
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.registerData.lat = this.route.snapshot.paramMap.get('lat');
    this.registerData.lng = this.route.snapshot.paramMap.get('lng');
    this.registerData.planId = this.route.snapshot.paramMap.get('planId');
    this.registerData.firstName = this.route.snapshot.paramMap.get('firstName');
    this.registerData.lastName = this.route.snapshot.paramMap.get('lastName');
    this.registerData.email = this.route.snapshot.paramMap.get('email');
    this.registerData.password = this.route.snapshot.paramMap.get('password');
    this.registerData.phoneNumber = this.route.snapshot.paramMap.get(
      'phoneNumber'
    );
    this.registerData.displayText = this.route.snapshot.paramMap.get(
      'displayText'
    );
    this.registerData.streetNumber = this.route.snapshot.paramMap.get(
      'streetNumber'
    );
    this.registerData.city = this.route.snapshot.paramMap.get('city');
    this.registerData.state = this.route.snapshot.paramMap.get('state');
    this.registerData.zip = this.route.snapshot.paramMap.get('zip');
    this.registerData.paymentId = this.route.snapshot.paramMap.get('paymentId');
  }

  onRegisterSubmit() {
    this.router.navigate(['/register/geolocation', this.registerData]);
  }
}
