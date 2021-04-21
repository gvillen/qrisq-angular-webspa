import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'qrisq-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() isUserLogin: boolean;

  @Input() userFirstName: string;

  constructor() {}

  ngOnInit() {}
}
