// angular
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Qrisq';

  isUserLogin: boolean;

  userFirstName: string;

  constructor() {}

  ngOnInit(): void {
    // this.identityService.isAuthenticated();
    // this.isUserLogin = this.identityService.isAuthenticated();
    // this.identityService.getUser().subscribe((user) => {
    //   this.userFirstName = user.first_name;
    // });
    // this.identityService.isUserLogin().subscribe((isUserLogin) => {
    //   this.isUserLogin = isUserLogin;
    // });
  }
}
