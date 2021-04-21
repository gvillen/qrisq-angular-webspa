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
    this.isUserLogin = this.identityService.isAuthenticated();
    this.userFirstName = this.identityService.getUser().firstName;
  }
}
