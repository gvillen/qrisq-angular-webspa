// angular
import { Component, OnInit } from '@angular/core';

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
  windGeoJSON: Object;
  lineGeoJSON: Object;
  pointsGeoJSON: Object;
  polygonGeoJSON: Object;
  isDataLoaded: Boolean;

  constructor(private windService: HurricaneWindService) {}

  ngOnInit() {
    this.lat = Number('42.4113405');
    this.lng = Number('-71.0511464');

    let wind = this.windService.getWindGeoJSON();
    let line = this.windService.getLineGeoJSON();
    let points = this.windService.getPointsGeoJSON();
    let polygon = this.windService.getPolygonGeoJSON();

    // wind.subscribe((geoJSON) => {
    //   this.windGeoJSON = geoJSON;
    //   this.isDataLoaded = true;
    // });

    forkJoin([wind, line, points, polygon]).subscribe((results) => {
      this.windGeoJSON = results[0];
      // this.lineGeoJSON = results[1];
      // this.pointsGeoJSON = results[2];
      // this.polygonGeoJSON = results[3];
      this.isDataLoaded = true;
    });

    // this.getGeoJSONGzip(windUrl);
    // this.getGeoJSONGzip(lineUrl);
    // this.getGeoJSONGzip(pointsUrl);
    // this.getGeoJSONGzip(polygonUrl);

    // this.getGeoJSON(lineUrl).subscribe({
    //   next: (geoJSON) => (this.lineGeoJSON = geoJSON),
    // });
    // this.getGeoJSON(pointsUrl).subscribe({
    //   next: (geoJSON) => {
    //     console.log(geoJSON);
    //     this.pointsGeoJSON = geoJSON;
    //   },
    // });
    // this.getGeoJSON(polygonUrl).subscribe({
    //   next: (geoJSON) => (this.polygonGeoJSON = geoJSON),
    // });
  }

  getGeoJSON(url) {
    const geoJSON = new Observable((observer) => {
      fetch(url)
        .then(function (response) {
          return response.blob();
        })
        .then((blob) => {
          var arrayBuffer;
          var fileReader = new FileReader();
          var res = {};
          fileReader.onload = (e) => {
            arrayBuffer = e.target.result;
            try {
              let result: any = pako.inflate(new Uint8Array(arrayBuffer), {
                to: 'string',
              });
              observer.next(JSON.parse(result));
            } catch (err) {
              console.log('Error ' + err);
            }
          };
          fileReader.readAsArrayBuffer(blob);
        });
    });
    return geoJSON;
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
