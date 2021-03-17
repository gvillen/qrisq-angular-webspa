import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'qrisq-onboarding-success-page',
  templateUrl: './onboarding-success.component.html',
  styleUrls: ['./onboarding-success.component.css'],
})
export class OnboardingSuccessPageComponent implements OnInit {
  onlyWind = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.onlyWind = this.route.snapshot.paramMap.get('onlyWind') === 'true';
  }
}
