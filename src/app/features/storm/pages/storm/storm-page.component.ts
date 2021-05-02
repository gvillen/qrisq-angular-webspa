import { selectStormData } from './../../store/storm.selectors';
import { WindRiskCategories } from '../../common/constants';
// angular
import { GoogleMapsAPIWrapper } from '@agm/core';
import { Component, OnInit } from '@angular/core';

// gzip
import pako from 'pako';

// rxjs
import { forkJoin, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

// services
import { QrStormDataService } from '../../services/StormData.service';

// data
import { select, Store } from '@ngrx/store';
import { TimeUtils } from '../../common/utils';
import {
  selectCredentials,
  selectSignIn,
} from '@app/features/identity/store/identity.selectors';
import { actionStormDataFetchRequest } from '../../store/storm.actions';
import { QrIdentityService } from '@app/features/identity/services/identity.service';
import { StormData } from '../../models/StormData.models';
import { QrStormSurgeService } from '../../services/StormSurgeService.service';
import { StormGeoJSON } from '../../models/StormGeoJSON.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';

@Component({
  selector: 'qr-storm-page',
  templateUrl: './storm-page.component.html',
  styleUrls: ['./storm-page.component.css'],
})
export class QrStormViewerPageComponent implements OnInit {
  lat: number;
  lng: number;
  zoom = 4;
  windGeoJSON: any;
  lineGeoJSON: any;
  pointsGeoJSON: any;
  polygonGeoJSON: any;
  stormName: string;
  displayAddress: string;
  isDataLoaded: boolean;
  timer: any;
  windy: any;
  canvasLayer: any;
  context: any;
  map: any;
  mapMode = 'summary';

  stormData$: Observable<StormData> = this.store.select(selectStormData);
  stormGeoJSON$: Observable<StormGeoJSON>;
  surgeGeoJson: Object;

  public get windRiskCategories() {
    return WindRiskCategories;
  }

  constructor(
    private store: Store,
    private identityService: QrIdentityService,
    private stormService: QrStormDataService,
    private stormSurgeService: QrStormSurgeService,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    // this.fetchSurge();
    this.identityService
      .signIn('jdoe@worldwindsinc.com', 'unknown')
      .subscribe((credentials) =>
        this.store.dispatch(
          actionStormDataFetchRequest({
            userId: 17,
            accessToken: credentials['access'],
          })
        )
      );

    this.stormSurgeService.getSurgeGeoJSON().subscribe((surge) => {
      console.log(surge);
      this.surgeGeoJson = surge;
    });

    // this.stormData$.subscribe(stormData => {
    //   if(stormData) {
    //     this.stormGeoJSON$ = new Obvservable<>
    //   }
    // });
  }

  toCDT(utc) {
    return TimeUtils.toCDT(utc);
  }

  onMapModeChange(mode) {
    this.mapMode = mode;
    console.log(mode);
  }

  mapReady(event) {
    this.map = event;
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
      document.getElementById('Settings')
    );
    // this.stormSurgeService
    //   .getPolygonGeoJSON()
    //   .subscribe((geoJson) => console.log(geoJson));
  }

  fetchSurge() {
    this.httpClient
      .get(environment.SURGE_SHP_ZIP_URL, {
        observe: 'response',
        responseType: 'blob',
      })
      .subscribe((response) => {
        const url = URL.createObjectURL(response.body);
        loadshp(
          {
            url,
            encoding: 'ISO-8859-1',
          },
          (data) => {
            this.surgeGeoJson = data;
          }
        );
      });
  }

  onMapReady(map) {
    let windy;
    let canvasLayer;
    let timer;

    fetch('https://qrisq-angular-webspa.s3.us-east-2.amazonaws.com/gfs.json')
      .then((response) => response.json())
      .then((result) => {
        const canvasLayerOptions = {
          map: map,
          animate: false,
          updateHandler: (overlay, params) => {
            if (timer) {
              window.clearTimeout(timer);
            }

            timer = setTimeout(function () {
              let bounds = map.getBounds();
              let mapSizeX = map.getDiv().offsetWidth;
              let mapSizeY = map.getDiv().offsetHeight;
              windy.start(
                [
                  [0, 0],
                  [mapSizeX, mapSizeY],
                ],
                mapSizeX,
                mapSizeY,
                [
                  [bounds.getSouthWest().lng(), bounds.getSouthWest().lat()],
                  [bounds.getNorthEast().lng(), bounds.getNorthEast().lat()],
                ]
              );
            }, 750);
          },
        };

        // canvasLayer = new CanvasLayer(canvasLayerOptions);

        // windy = new Windy({
        //   canvas: canvasLayer.canvas,
        //   data: result,
        // });

        // //prepare context var
        // let context = canvasLayer.canvas.getContext('2d');

        // google.maps.event.addListener(map, 'bounds_changed', function () {
        //   console.log('sds');
        //   windy.stop();
        //   context.clearRect(0, 0, 3000, 3000);
        // });
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
