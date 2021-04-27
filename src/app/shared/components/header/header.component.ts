import { Component, Input, OnInit } from '@angular/core';

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
}
