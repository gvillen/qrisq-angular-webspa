import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'qrisq-account-created',
  templateUrl: './account-created.component.html',
  styleUrls: ['./account-created.component.css'],
})
export class RegisterAccountCreatedPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  toLogin() {
    this.router.navigate(['/identity/login']);
  }
}
