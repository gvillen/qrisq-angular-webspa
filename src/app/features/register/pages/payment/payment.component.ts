import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'qrisq-register-payment-page',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class RegisterPaymentPageComponent implements OnInit {
  paymentMethod = 'card';

  paymentFailed = false;

  constructor() {}

  ngOnInit(): void {}
}
