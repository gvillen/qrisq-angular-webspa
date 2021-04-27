import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class AppHeaderComponent implements OnInit {
  @Input() isUserLogin: boolean;

  @Input() userFirstName: string;

  constructor() {}

  ngOnInit(): void {}
}
