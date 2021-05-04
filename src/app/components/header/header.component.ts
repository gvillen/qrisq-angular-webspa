import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class AppHeaderComponent implements OnInit {
  @Input() isUserLogin: boolean;

  @Input() userFirstName: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  openStormViewer() {
    this.router.navigate(['/storm']); 2
  }
}
