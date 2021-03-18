import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

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
    formattedAddress: '',
    planId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    paymentId: '',
  };

  public payPalConfig?: IPayPalConfig;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
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
    this.initConfig();
  }

  onCreditCardPaymentSubmit(creditCardInfo) {
    console.log(creditCardInfo);
    this.registerData.paymentId = '1234567890';
    this.router.navigate(['/register/payment-successful', this.registerData]);
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
