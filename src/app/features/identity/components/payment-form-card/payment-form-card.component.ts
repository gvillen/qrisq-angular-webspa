import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { CreditCardValidators } from 'angular-cc-library';
import { PaymentInformation } from '../../models/Payment.models';

@Component({
  selector: 'qrisq-payment-form-card',
  templateUrl: './payment-form-card.component.html',
  styleUrls: ['./payment-form-card.component.css'],
})
export class PaymentFormCardComponent implements OnInit {
  validateForm!: FormGroup;

  @Output() submitPayment = new EventEmitter();

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
      const paymentInformation: PaymentInformation = {
        firstName: this.validateForm.get('firstName').value,
        lastName: this.validateForm.get('lastName').value,
        cardNumber: this.validateForm.get('cardNumber').value,
        expirationDate: this.validateForm.get('expirationDate').value,
        cvc: this.validateForm.get('cvc').value,
        billingAddress: this.validateForm.get('billingAddress').value,
        city: this.validateForm.get('city').value,
        state: this.validateForm.get('state').value,
        zipCode: this.validateForm.get('zipPostalCode').value,
        amount: 0,
        subscriptionPlanId: 0,
      };
      paymentInformation.cardNumber = paymentInformation.cardNumber.replace(
        /\s/g,
        ''
      );
      paymentInformation.expirationDate = paymentInformation.expirationDate.replace(
        /\s/g,
        ''
      );
      this.submitPayment.emit(paymentInformation);
    }
  }
}
