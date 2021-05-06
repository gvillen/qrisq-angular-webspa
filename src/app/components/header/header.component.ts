import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class AppHeaderComponent implements OnInit {
  @Input() isUserLogin: boolean;
  @Input() userFirstName: string;
  @Output() logout = new EventEmitter<Event>();

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {}

  openStormViewer() {
    this.router.navigate(['/storm']);
  }

  onLogout($event) {
    this.logout.emit($event);
  }
}
