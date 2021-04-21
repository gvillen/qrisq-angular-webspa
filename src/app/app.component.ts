import { IdentityService } from '@features/identity/services/IdentityService.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Qrisq';

  isUserLogin: boolean;

  userFirstName: string;

  constructor(private identityService: IdentityService) {}

  ngOnInit() {
    // this.identityService.isAuthenticated();
    // this.isUserLogin = this.identityService.isAuthenticated();
    this.identityService.getUser().subscribe((user) => {
      this.userFirstName = user.first_name;
      console.log(user);
      console.log(user.first_name);
    });

    this.identityService.isUserLogin().subscribe((isUserLogin) => {
      this.isUserLogin = isUserLogin;
      console.log(this.isUserLogin);
    });
  }
}
