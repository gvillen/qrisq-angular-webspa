import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { take } from 'rxjs/operators';
import { NewUser } from '../../sign-up/schema/models';
import { SignUpService } from '../../service/SignUpService.service';

@Component({
  selector: 'qrisq-payment-successful',
  templateUrl: './payment-successful.component.html',
  styleUrls: ['./payment-successful.component.css'],
})
export class RegisterPaymentSuccessfulPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onRegisterSubmit() {
    this.router.navigate(['/sign-up/geolocation']);
  }
}
