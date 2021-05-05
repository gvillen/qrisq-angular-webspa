import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'qr-home-page',
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.scss'],
})
export class QrHomePageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  OnSignUp() {
    this.router.navigate(['/identity/sign-up']);
  }
}
