import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { PaymentInformation } from '../models/Payment.models';

@Injectable({
  providedIn: 'root',
})
export class QrPaymentService {
  constructor(private httpClient: HttpClient) {}

  processPayment(paymentInformation: PaymentInformation) {
    return this.httpClient.post(
      environment.API_URL + '/process-transaction',
      {
        first_name: paymentInformation.firstName,
        last_name: paymentInformation.lastName,
        card_number: paymentInformation.cardNumber,
        expiration_date: paymentInformation.expirationDate,
        cvc: paymentInformation.cvc,
        billing_address: paymentInformation.billingAddress,
        city: paymentInformation.city,
        state: paymentInformation.state,
        zip_code: paymentInformation.zipCode,
        amount: paymentInformation.amount,
        subscription_plan_id: 1,
      },
      {
        headers: { 'Content-type': 'application/json; charset=utf-8' },
      }
    );
  }
}
