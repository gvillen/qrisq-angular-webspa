import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'qrisq-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isMenuCollapsed = true;
  @Input() isUserLogin: boolean;

  @Input() userFirstName: string;

  constructor() {}
  ngOnInit() {}
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let element = document.querySelector('.navbar');
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('navbar-dark');
    } else {
      element.classList.remove('navbar-dark');
    }
  }
}
