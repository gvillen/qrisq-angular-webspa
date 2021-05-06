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
import { take } from 'rxjs/operators';
import { PaymentInformation } from '../../models/Payment.models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SignedUserState } from '../../store/identity.models';
import { actionProcessPaymentRequest } from '../../store/identity.actions';
import { selectSignedUser } from '../../store/identity.selectors';

@Component({
  selector: 'qrisq-register-payment-page',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class QrRegisterPaymentPageComponent implements OnInit {
  paymentMethod = 'card';
  paymentFailed = false;

  signedUser$: Observable<SignedUserState>;
  signedUser: SignedUserState;

  public payPalConfig?: IPayPalConfig;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initConfig();

    this.store
      .select(selectSignedUser)
      .pipe(take(1))
      .subscribe((signedUser) => (this.signedUser = signedUser));
  }

  onCreditCardPaymentSubmit(paymentInformation: PaymentInformation) {
    paymentInformation.subscriptionPlanId = this.signedUser.user.subscription.id;
    this.store.dispatch(actionProcessPaymentRequest({ paymentInformation }));
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
                value: this.signedUser.user.subscription.price,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: `${this.signedUser.user.subscription.price}`,
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
                    value: `${this.signedUser.user.subscription.price}`,
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
        // this.registerData.paymentId = Guid.create().toString().substring(0, 8);
        // this.router.navigate([
        //   '/register/payment-successful',
        //   this.registerData,
        // ]);
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
