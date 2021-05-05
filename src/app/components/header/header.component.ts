import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
  public isMenuCollapsed = true;
  @Input() isUserLogin: boolean;

  @Input() userFirstName: string;

  constructor(private router: Router) {}

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
    this.router.navigate(['/storm']); 2
  }
}
