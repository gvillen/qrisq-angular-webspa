// angular
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// paypal
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

// guid
import { Guid } from 'guid-typescript';
import { SignUpService } from '../../service/SignUpService.service';
import { NewUser } from '../../schema/models';

@Component({
  selector: 'qrisq-register-payment-page',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class RegisterPaymentPageComponent implements OnInit {
  paymentMethod = 'card';

  paymentFailed = false;

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

  public payPalConfig?: IPayPalConfig;

  newUser: NewUser;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private signUpService: SignUpService
  ) {}

  ngOnInit(): void {
    this.initConfig();
    this.signUpService.getNewUser().subscribe((newUser) => {
      this.newUser = newUser;
    });
  }

  onCreditCardPaymentSubmit(creditCardInfo) {
    this.newUser.paymentId = Guid.create().toString().substring(0, 8);
    this.signUpService.setNewUser(this.newUser);
    this.router.navigate(['/register/payment-successful']);
  }

  onPaypalPaymentSubmit() {}

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: '5.00',
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: '5.00',
                  },
                },
              },
              items: [
                {
                  name: 'Qrisq Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'USD',
                    value: '5.00',
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
        extraQueryParams: [{ name: 'disable-funding', value: 'credit,card' }],
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
        this.registerData.paymentId = Guid.create().toString().substring(0, 8);
        this.router.navigate([
          '/register/payment-successful',
          this.registerData,
        ]);
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
      },
      onCancel: (data, actions) => {
        this.paymentFailed = true;
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        this.paymentFailed = true;
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
