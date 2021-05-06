import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'qrisq-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  @Input() imageUrl: string; // decorate the property with @Input()

  constructor() {}

  ngOnInit() {}
}
