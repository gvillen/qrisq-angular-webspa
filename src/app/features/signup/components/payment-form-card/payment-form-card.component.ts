import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { CreditCardValidators } from 'angular-cc-library';

@Component({
  selector: 'qrisq-payment-form-card',
  templateUrl: './payment-form-card.component.html',
  styleUrls: ['./payment-form-card.component.css'],
})
export class PaymentFormCardComponent implements OnInit {
  validateForm!: FormGroup;

  @Output() submit = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      cardNumber: [null, [CreditCardValidators.validateCCNumber]],
      expirationDate: [null, [CreditCardValidators.validateExpDate]],
      cvc: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(4)],
      ],
      billingAddress: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zipPostalCode: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.status === 'VALID') {
      this.submit.emit(this.validateForm.value);
    }
  }
}
