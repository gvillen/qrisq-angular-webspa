import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GoogleMapsOverlay as DeckOverlay } from '@deck.gl/google-maps';
import { GeoJsonLayer } from '@deck.gl/layers';
import { SurgeRiskLevels } from '../../common/constants';
import moment from 'moment';
import { Observable } from 'rxjs';
import hexRgb from 'hex-rgb';
import { getESRISurgeLevelColor } from '../../common/utils';
import { polygon } from '@turf/helpers';
import centerOfMass from '@turf/center-of-mass';

@Component({
  selector: 'qr-storm-map',
  templateUrl: './qr-storm-map.component.html',
  styleUrls: ['./qr-storm-map.component.scss'],
})
export class QrStormMapComponent implements OnInit {
  @Input() surgeGeoJSON: any;
  @Input() lineGeoJSON: Object;
  @Input() pointsGeoJSON: any;
  @Input() polygonsGeoJSON: Object;
  @Input() windGeoJSON: Object;
  @Input() windData: any;
  @Input() userLattitude: number;
  @Input() userLongitude: number;
  @Input() surgeRisk: string;
  @Input() stormDistance: number;
  @Input() mode: string;
  @Input() zoom: number;
  @Input() restriction: google.maps.MapRestriction;
  @Output() modeChange = new EventEmitter<string>();
  @Output() mapLoaded = new EventEmitter<boolean>();

  map: any;
  canvasLayer: any;
  infowindow = new google.maps.InfoWindow();

  stormLattitude = 0;
  stormLongitude = 0;
  // tslint:disable-next-line: variable-name
  _activeLayer = 'surge';
  isSettingsVisible = false;
  windy = null;
  boundsChangedLister = null;
  vortexConfig = {
    velocityScale: 0.02,
    intensityScaleStep: 2,
    maxWindIntensity: 100,
    maxParticleAge: 10,
    particleLineWidth: 0.15,
    particleMultiplier: 30,
    particleReduction: 0.8,
    frameRate: 40,
  };

  // tslint:disable-next-line: variable-name
  private _isTrackAndConeChecked: boolean = true;

  public get isTrackAndConeChecked(): boolean {
    return this._isTrackAndConeChecked;
  }
  public set isTrackAndConeChecked(value: boolean) {
    if (value) {
      this.modeChange.emit('summary');
    } else {
      this.modeChange.emit('surge');
    }
    this._isTrackAndConeChecked = value;
  }

  public get activeLayer(): string {
    return this._activeLayer;
  }
  public set activeLayer(v: string) {
    if (v === 'surge') {
      if (this.isTrackAndConeChecked) {
        this.modeChange.emit('summary');
      } else {
        this.modeChange.emit('surge');
      }
      this.map.data.s;
      this.canvasLayer.setMap(null);
    } else if (v === 'wind') {
      this.modeChange.emit('wind');
      this.canvasLayer.setMap(null);
    } else {
      this.modeChange.emit('vortex');
      this.canvasLayer.setMap(this.map);
    }
    this._activeLayer = v;
  }

  get levels() {
    return SurgeRiskLevels;
  }

  isChecked = true;

  constructor() {}

  ngOnInit() {
    const points: Array<any> = this.pointsGeoJSON.features;
    const sortedPoints = points.slice().sort(this.sortByForecastLongDate);
    this.stormLattitude = Number.parseFloat(sortedPoints[0].properties['LAT']);
    this.stormLongitude = Number.parseFloat(sortedPoints[0].properties['LON']);
  }

  onVelocityScaleAfterChange(velocityScale: number) {
    this.vortexConfig = {
      ...this.vortexConfig,
      velocityScale: velocityScale,
    };
    this.updateVortexConfig();
  }

  onFrameRateAfterChange(frameRate: number) {
    this.vortexConfig = {
      ...this.vortexConfig,
      frameRate,
    };
    this.updateVortexConfig();
  }

  onParticleReductionAfterChange(particleReduction: number) {
    this.vortexConfig = {
      ...this.vortexConfig,
      particleReduction,
    };
    this.updateVortexConfig();
  }

  onParticleMultiplierAfterChange(particleMultiplier: number) {
    this.vortexConfig = {
      ...this.vortexConfig,
      particleMultiplier,
    };
    this.updateVortexConfig();
  }

  onParticleLineWidthAfterChange(particleLineWidth: number) {
    this.vortexConfig = {
      ...this.vortexConfig,
      particleLineWidth,
    };
    this.updateVortexConfig();
  }

  onMaxParticleAgeAfterChange(maxParticleAge: number) {
    this.vortexConfig = {
      ...this.vortexConfig,
      maxParticleAge,
    };
    this.updateVortexConfig();
  }

  onMaxWindIntensityAfterChange(maxWindIntensity: number) {
    this.vortexConfig = {
      ...this.vortexConfig,
      maxWindIntensity,
    };
    this.updateVortexConfig();
  }

  onIntensityScaleStepAfterChange(intensityScaleStep: number) {
    this.vortexConfig = {
      ...this.vortexConfig,
      intensityScaleStep,
    };
    this.updateVortexConfig();
  }

  onSettingsClick($event) {
    this.isSettingsVisible = true;
  }

  updateVortexConfig() {
    // const vortexConfig = {
    //   velocityScale: 0.08,
    //   intensityScaleStep: 2,
    //   maxWindIntensity: 10,
    //   maxParticleAge: 50,
    //   particleLineWidth: 0.15,
    //   particleMultiplier: 1 / 30,
    //   particleReduction: 0.8,
    //   frameRate: 20,
    // };

    this.windy.setVortexConfig(this.vortexConfig);
    this.windy.stop();
    let bounds = this.map.getBounds();
    let mapSizeX = this.map.getDiv().offsetWidth;
    let mapSizeY = this.map.getDiv().offsetHeight;
    this.windy.start(
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
  }

  getUserLocationIcon(surgeRisk) {
    return {
      path:
        'm503.898438 231.476562-236.800782-226.984374c-6.1875-5.976563-16-5.976563-22.1875 0l-237.011718 227.199218c-5.121094 4.90625-7.89453175 11.945313-7.89453175 18.984375 0 14.722657 11.94921875 26.667969 26.66796875 26.667969h37.332031v192c0 23.46875 19.203125 42.667969 42.667969 42.667969h298.667969c23.464844 0 42.664062-19.199219 42.664062-42.667969v-192h37.335938c14.71875 0 26.664062-11.945312 26.664062-26.667969 0-7.039062-2.773437-14.078125-8.105468-19.199219zm0 0',
      fillColor: this.levels[surgeRisk].colorHex,
      fillOpacity: 1,
      strokeWeight: 1,
      rotation: 0,
      scale: 2,
      anchor: new google.maps.Point(this.userLattitude, this.userLongitude),
    };
  }

  onSurgeLayerClick(event) {
    var feat = event.feature;
    // const poly = polygon([feat.geometry.coordinates[0]]);
    // const center = centerOfMass(polygon);
    // console.log(center);
    const maxft = Number(Number(feat.getProperty('maxft')).toFixed(2));
    const eleavg = Number(Number(feat.getProperty('eleavg')).toFixed(2));
    const elemax = Number(Number(feat.getProperty('elemax')).toFixed(2));
    const elemin = Number(Number(feat.getProperty('elemin')).toFixed(2));
    let html = `<b>Max Depth:</b> ${maxft} ft.<br />`;
    html += `<b>Elev. Avg.:</b> ${eleavg}<br />`;
    html += `<b>Elev. Max.:</b> ${elemax}<br />`;
    html += `<b>Elev. Min.:</b> ${elemin}`;
    this.infowindow.setContent(html);
    this.infowindow.setPosition(event.latLng);
    this.infowindow.open(this.map);
  }

  lineStyleFunc(feature) {
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
      zIndex: 30,
      icon: feature.getProperty('icon'),
    };
  }

  pointsStyleFunc(feature) {
    const circle: google.maps.Symbol = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 7,
      fillColor: '#000',
    };
    console.log(feature);
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
      title: feature.getProperty('DVLBL'),
      visible: feature.getProperty('visible'),
      zIndex: 40,
      icon: circle,
    };
  }

  polygonsStyleFunc(feature) {
    return {
      clickable: feature.getProperty('clickable'),
      cursor: feature.getProperty('cursor'),
      draggable: feature.getProperty('draggable'),
      editable: feature.getProperty('editable'),
      fillColor: feature.getProperty('fill'),
      fillOpacity: feature.getProperty('fillOpacity'),
      strokeColor: feature.getProperty('stroke'),
      strokeOpacity: feature.getProperty('strokeOpacity'),
      strokeWeight: 2,
      title: feature.getProperty('title'),
      visible: feature.getProperty('visible'),
      zIndex: 20,
      icon: feature.getProperty('icon'),
    };
  }

  windStyleFunc(feature) {
    return {
      clickable: feature.getProperty('clickable'),
      cursor: feature.getProperty('cursor'),
      draggable: feature.getProperty('draggable'),
      editable: feature.getProperty('editable'),
      fillColor: feature.getProperty('fill'),
      fillOpacity: 0.8,
      strokeColor: feature.getProperty('fill'),
      strokeOpacity: 0.8,
      strokeWeight: 0.6,
      title: feature.getProperty('title'),
      visible: feature.getProperty('visible'),
      zIndex: feature.getProperty('zIndex'),
      icon: feature.getProperty('icon'),
    };
  }

  surgeStyleFunc(feature) {
    const maxft = feature.getProperty('maxft');
    let fillColor = '#fff';
    let fillOpacity = 0;
    fillColor = getESRISurgeLevelColor(Number.parseFloat(maxft));
    return {
      draggable: false,
      editable: false,
      fillColor: fillColor,
      fillOpacity: 0.7,
      strokeColor: fillColor,
      strokeWeight: 0.3,
      strokeOpacity: 0.75,
    };
  }

  mapReady(map) {
    this.mapLoaded.emit(true);
    this.map = map;

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
      document.getElementById('Settings')
    );
    this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(
      document.getElementById('select-map-layer')
    );
    this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(
      document.getElementById('property-surge-risk')
    );
    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
      document.getElementById('legend-water-depth')
    );
    this.map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(
      document.getElementById('property-wind-risk')
    );
    this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(
      document.getElementById('map-settings')
    );

    const b = new google.maps.LatLngBounds();
    b.extend(new google.maps.LatLng(this.userLattitude, this.userLongitude));
    b.extend(new google.maps.LatLng(this.stormLattitude, this.stormLongitude));

    const marker = new google.maps.Marker({
      position: b.getCenter(),
      title: 'Hello World!',
    });

    // marker.setMap(map);

    let timer;

    const canvasLayerOptions = {
      map: map,
      animate: false,
      updateHandler: (overlay, params) => {
        if (timer) {
          window.clearTimeout(timer);
        }

        timer = setTimeout(() => {
          let bounds = map.getBounds();
          let mapSizeX = map.getDiv().offsetWidth;
          let mapSizeY = map.getDiv().offsetHeight;
          this.windy.start(
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

    this.canvasLayer = new CanvasLayer(canvasLayerOptions);
    this.canvasLayer.setMap(null);

    this.windy = Windy({
      canvas: this.canvasLayer.canvas,
      data: this.windData,
      vortexConfig: this.vortexConfig,
    });

    //prepare context var
    let context = this.canvasLayer.canvas.getContext('2d');

    this.boundsChangedLister = google.maps.event.addListener(
      map,
      'bounds_changed',
      () => {
        this.windy.stop();
        context.clearRect(0, 0, 3000, 3000);
      }
    );
  }

  sortByForecastLongDate(fa, fb) {
    const dateFormat = 'YYYY-M-D h:mm A ddd [CDT]';
    const propName = 'FLDATELBL';
    const d1 = moment(fa.properties[propName], dateFormat);
    const d2 = moment(fb.properties[propName], dateFormat);
    if (d1.isAfter(d2)) {
      return 1;
    }
    if (d1.isBefore(d2)) {
      return -1;
    }
    return 0;
  }

  getMarkerPoints(featureCollection) {
    const points: Array<any> = featureCollection.features;

    const sortedPoints = points.slice().sort(this.sortByForecastLongDate);
    this.stormLattitude = Number.parseFloat(sortedPoints[0].properties['LAT']);
    this.stormLongitude = Number.parseFloat(sortedPoints[0].properties['LON']);
    // console.log(Number.parseFloat(sortedPoints[0].properties['LAT']));
    // console.log(Number.parseFloat(sortedPoints[0].properties['LON']));

    const markers = [];
    for (let i = 0; i < sortedPoints.length; i++) {
      const circle: google.maps.Symbol = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 7,
      };
      let marker = {
        lattitude: Number.parseFloat(sortedPoints[0].properties['LAT']),
        longitude: Number.parseFloat(sortedPoints[0].properties['LON']),
        iconUrl: circle,
        label: '',
      };
      markers.push(marker);
    }
    // console.log(featureCollection);
    return markers;
  }

  onSettingsSubmit($event) {
    this.isSettingsVisible = false;
  }
  onSettingsCancel($event) {
    this.isSettingsVisible = false;
  }
}
