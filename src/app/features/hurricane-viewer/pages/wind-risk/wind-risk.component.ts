// angular
import { Component, OnInit } from '@angular/core';
import { IdentityService } from '@app/features/identity/services/IdentityService.service';

// gzip
import pako from 'pako';

// rxjs
import { forkJoin, Observable } from 'rxjs';

// services
import { HurricaneWindService } from '../../services/hurricane-wind-service';

@Component({
  selector: 'qrisq-hurricane-viewer-wind-risk',
  templateUrl: './wind-risk.component.html',
  styleUrls: ['./wind-risk.component.css'],
})
export class WindRiskPageComponent implements OnInit {
  lat: number;
  lng: number;
  zoom = 3;
  windGeoJSON: any;
  lineGeoJSON: any;
  pointsGeoJSON: any;
  polygonGeoJSON: any;
  stormName: string;
  displayAddress: string;
  isDataLoaded: boolean;

  constructor(
    private windService: HurricaneWindService,
    private identityService: IdentityService
  ) {}

  ngOnInit() {
    this.lat = Number('42.4113405');
    this.lng = Number('-71.0511464');

    let wind = this.windService.getWindGeoJSON();
    let line = this.windService.getLineGeoJSON();
    let points = this.windService.getPointsGeoJSON();
    let polygon = this.windService.getPolygonGeoJSON();
    let user = forkJoin([wind, line, points, polygon]).subscribe((results) => {
      this.windGeoJSON = results[0];
      this.lineGeoJSON = results[1];
      this.pointsGeoJSON = results[2];
      this.polygonGeoJSON = results[3];

      this.stormName = this.pointsGeoJSON.features[0].properties.STORMNAME;

      this.identityService.getUser().subscribe((user) => {
        console.log(user);
        this.displayAddress = user.profile.address.displayText;
        this.isDataLoaded = true;
      });
    });
  }

  styleFunc(feature) {
    return {
      clickable: feature.getProperty('clickable'),
      cursor: feature.getProperty('cursor'),
      draggable: feature.getProperty('draggable'),
      editable: feature.getProperty('editable'),
      fillColor: feature.getProperty('fill'),
      fillOpacity: feature.getProperty('fillOpacity'),
      strokeColor: feature.getProperty('stroke'),
      strokeOpacity: feature.getProperty('strokeOpacity'),
      strokeWeight: feature.getProperty('strokeWidth'),
      title: feature.getProperty('title'),
      visible: feature.getProperty('visible'),
      zInde2x: feature.getProperty('zIndex'),
      icon: feature.getProperty('icon'),
    };
  }
}
