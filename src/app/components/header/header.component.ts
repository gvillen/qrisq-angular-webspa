import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
  public isMenuCollapsed = true;
  @Input() isUserLogin: boolean;
  @Input() userFirstName: string;
  @Output() logout = new EventEmitter<Event>();

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let element = document.querySelector('.navbar');
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('navbar-dark');
    } else {
      element.classList.remove('navbar-dark');
    }
  }

  openStormViewer() {
    this.router.navigate(['/storm']);
  }

  onLogout($event) {
    this.logout.emit($event);
  }
}
