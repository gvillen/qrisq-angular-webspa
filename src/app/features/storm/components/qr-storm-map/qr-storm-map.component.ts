import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GoogleMapsOverlay as DeckOverlay } from '@deck.gl/google-maps';
import { GeoJsonLayer } from '@deck.gl/layers';
import { SurgeRiskLevels } from '../../common/constants';
import moment from 'moment';
import { Observable } from 'rxjs';
import hexRgb from 'hex-rgb';
import { getESRISurgeLevelColor } from '../../common/utils';

@Component({
  selector: 'qr-storm-map',
  templateUrl: './qr-storm-map.component.html',
  styleUrls: ['./qr-storm-map.component.css'],
})
export class QrStormMapComponent implements OnInit {
  @Input() surgeGeoJSON: Object;
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
  @Output() modeChange = new EventEmitter<string>();

  map: any;
  canvasLayer: any;

  stormLattitude = 0;
  stormLongitude = 0;
  // tslint:disable-next-line: variable-name
  _activeLayer = 'surge';

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
        this.canvasLayer.setMap(null);
        this.modeChange.emit('summary');
      } else {
        this.canvasLayer.setMap(null);
        this.modeChange.emit('surge');
      }
    } else {
      this.canvasLayer.setMap(this.map);
      this.modeChange.emit('wind');
    }
    this._activeLayer = v;
  }

  get levels() {
    return SurgeRiskLevels;
  }

  isChecked = true;
  stormDistancePath$: Observable<string>;

  constructor() {}

  ngOnInit() {
    this.stormDistancePath$ = new Observable<string>((observer) => {
      const TextToSVG = require('text-to-svg');
      TextToSVG.load('assets/fonts/Roboto.ttf', (err, textToSVG) => {
        const d = textToSVG.getD(
          this.stormDistance.toFixed(2).toString() + ' miles',
          { fontSize: 20, kerning: true }
        );
        observer.next(d);
        observer.complete();
      });
    });
    const points: Array<any> = this.pointsGeoJSON.features;
    const sortedPoints = points.slice().sort(this.sortByForecastLongDate);
    this.stormLattitude = Number.parseFloat(sortedPoints[0].properties['LAT']);
    this.stormLongitude = Number.parseFloat(sortedPoints[0].properties['LON']);
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
      strokeWeight: 0.5,
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
    if (maxft) {
      fillColor = '#005151';
      let value = Number.parseFloat(maxft);

      if (value === 0) {
        fillColor = '#004343';
      } else if (value >= 0.1 && value < 0.2) {
        fillColor = '#005151';
      } else if (value >= 0.2 && value < 0.3) {
        fillColor = '#006060';
      } else if (value >= 0.3 && value < 0.4) {
        fillColor = '#006E6E';
      } else if (value >= 0.4 && value < 0.5) {
        fillColor = '#007D7D';
      } else if (value >= 0.5 && value < 0.6) {
        fillColor = '#008B8B';
      } else if (value >= 0.6 && value < 0.7) {
        fillColor = '#009999';
      } else if (value >= 0.7 && value < 0.8) {
        fillColor = '#00A8A8';
      } else if (value >= 0.8 && value < 0.9) {
        fillColor = '#00B6B6';
      } else if (value >= 1 && value < 1.1) {
        fillColor = '#00C4C4';
      } else if (value >= 1.1 && value < 1.2) {
        fillColor = '#00D3D3';
      } else if (value >= 1.2 && value < 1.3) {
        fillColor = '#00E1E1';
      } else if (value >= 1.3 && value < 1.4) {
        fillColor = '#00F0F0';
      } else if (value >= 1.4 && value < 1.5) {
        fillColor = '#00FEFE';
      } else if (value >= 1.5 && value < 1.6) {
        fillColor = '#00F2E7';
      } else if (value >= 1.6 && value < 1.7) {
        fillColor = '#00E7D0';
      } else if (value >= 1.7 && value < 2) {
        fillColor = '#00DBB9';
      } else if (value >= 2 && value < 2.1) {
        fillColor = '#00D0A2';
      } else if (value >= 2.1 && value < 2.2) {
        fillColor = '#00C48B';
      } else if (value >= 2.2 && value < 2.3) {
        fillColor = '#00B973';
      } else if (value >= 2.3 && value < 2.4) {
        fillColor = '#00AD5C';
      } else if (value >= 2.4 && value < 2.5) {
        fillColor = '#00A245';
      } else if (value >= 2.5 && value < 2.6) {
        fillColor = '#00962E';
      } else if (value >= 2.6 && value < 2.7) {
        fillColor = '#008B17';
      } else if (value >= 2.7 && value < 3) {
        fillColor = '#007F00';
      } else if (value >= 3 && value < 3.1) {
        fillColor = '#FFFF00';
      } else if (value >= 3.1 && value < 3.2) {
        fillColor = '#FFFA00';
      } else if (value >= 3.2 && value < 3.3) {
        fillColor = '#FFF500';
      } else if (value >= 3.3 && value < 3.4) {
        fillColor = '#FFF000';
      } else if (value >= 3.4 && value < 3.5) {
        fillColor = '#FFEB00';
      } else if (value >= 3.5 && value < 3.6) {
        fillColor = '#FFE600';
      } else if (value >= 3.6 && value < 3.7) {
        fillColor = '#FFE100';
      } else if (value >= 3.7 && value < 3.8) {
        fillColor = '#FFDD00';
      } else if (value >= 3.8 && value < 4) {
        fillColor = '#FFD800';
      } else if (value >= 4 && value < 4.1) {
        fillColor = '#FFD300';
      } else if (value >= 4.1 && value < 4.2) {
        fillColor = '#FFCE00';
      } else if (value >= 4.2 && value < 4.3) {
        fillColor = '#FFC900';
      } else if (value >= 4.3 && value < 4.4) {
        fillColor = '#FFC400';
      } else if (value >= 4.4 && value < 4.5) {
        fillColor = '#FFBF00';
      } else if (value >= 4.5 && value < 4.6) {
        fillColor = '#FFBA00';
      } else if (value >= 4.6 && value < 4.7) {
        fillColor = '#FFB500';
      } else if (value >= 4.7 && value < 5.0) {
        fillColor = '#FFB000';
      } else if (value >= 5.0 && value < 5.1) {
        fillColor = '#FFAB00';
      } else if (value >= 5.1 && value < 5.2) {
        fillColor = '#FFA600';
      } else if (value >= 5.2 && value < 5.3) {
        fillColor = '#FFA100';
      } else if (value >= 5.3 && value < 5.4) {
        fillColor = '#FF9D00';
      } else if (value >= 5.4 && value < 5.5) {
        fillColor = '#FF9800';
      } else if (value >= 5.5 && value < 5.6) {
        fillColor = '#FF9300';
      } else if (value >= 5.6 && value < 5.7) {
        fillColor = '#FF8E00';
      } else if (value >= 5.7 && value < 5.8) {
        fillColor = '#FF8900';
      } else if (value >= 5.8 && value < 6) {
        fillColor = '#FF8400';
      } else if (value >= 6 && value < 6.1) {
        fillColor = '#FF7F00';
      } else if (value >= 6.1 && value < 6.2) {
        fillColor = '#FF7A00';
      } else if (value >= 6.2 && value < 6.3) {
        fillColor = '#FF7500';
      } else if (value >= 6.3 && value < 6.4) {
        fillColor = '#FF7000';
      } else if (value >= 6.4 && value < 6.5) {
        fillColor = '#FF6B00';
      } else if (value >= 6.5 && value < 6.6) {
        fillColor = '#FF6600';
      } else if (value >= 6.6 && value < 6.7) {
        fillColor = '#FF6100';
      } else if (value >= 6.7 && value < 7) {
        fillColor = '#FF5B00';
      } else if (value >= 7 && value < 7.1) {
        fillColor = '#FF5600';
      } else if (value >= 7.1 && value < 7.2) {
        fillColor = '#FF5100';
      } else if (value >= 7.2 && value < 7.3) {
        fillColor = '#FF4C00';
      } else if (value >= 7.3 && value < 7.4) {
        fillColor = '#FF4700';
      } else if (value >= 7.4 && value < 7.5) {
        fillColor = '#FF4200';
      } else if (value >= 7.5 && value < 7.6) {
        fillColor = '#FF3D00';
      } else if (value >= 7.6 && value < 7.7) {
        fillColor = '#FF3800';
      } else if (value >= 7.7 && value < 7.8) {
        fillColor = '#FF3300';
      } else if (value >= 7.8 && value < 8) {
        fillColor = '#FF2E00';
      } else if (value >= 8 && value < 8.1) {
        fillColor = '#FF2900';
      } else if (value >= 8.1 && value < 8.2) {
        fillColor = '#FF2400';
      } else if (value >= 8.2 && value < 8.3) {
        fillColor = '#FF1E00';
      } else if (value >= 8.3 && value < 8.4) {
        fillColor = '#FF1900';
      } else if (value >= 8.4 && value < 8.5) {
        fillColor = '#FF1400';
      } else if (value >= 8.5 && value < 8.6) {
        fillColor = '#FF0F00';
      } else if (value >= 8.6 && value < 8.7) {
        fillColor = '#FF0A00';
      } else if (value >= 8.7 && value < 9) {
        fillColor = '#FF0500';
      } else if (value >= 9 && value < 9.1) {
        fillColor = '#FF0000';
      } else if (value >= 9.1 && value < 9.2) {
        fillColor = '#FA0000';
      } else if (value >= 9.2 && value < 9.3) {
        fillColor = '#F50000';
      } else if (value >= 9.3 && value < 9.4) {
        fillColor = '#EF0000';
      } else if (value >= 9.4 && value < 9.5) {
        fillColor = '#EA0000';
      } else if (value >= 9.5 && value < 9.6) {
        fillColor = '#E50000';
      } else if (value >= 9.6 && value < 9.7) {
        fillColor = '#E00000';
      } else if (value >= 9.7 && value < 9.8) {
        fillColor = '#DB0000';
      } else if (value >= 9.8 && value < 10) {
        fillColor = '#D50000';
      } else if (value >= 10 && value < 10.1) {
        fillColor = '#D00000';
      } else if (value >= 10.1 && value < 10.2) {
        fillColor = '#CB0000';
      } else if (value >= 10.2 && value < 10.3) {
        fillColor = '#C60000';
      } else if (value >= 10.3 && value < 10.4) {
        fillColor = '#C10000';
      } else if (value >= 10.4 && value < 10.5) {
        fillColor = '#BB0000';
      } else if (value >= 10.5 && value < 10.6) {
        fillColor = '#B60000';
      } else if (value >= 10.6 && value < 10.7) {
        fillColor = '#B10000';
      } else if (value >= 10.7 && value < 11) {
        fillColor = '#AC0000';
      } else if (value >= 11 && value < 11.1) {
        fillColor = '#A70000';
      } else if (value >= 11.1 && value < 11.2) {
        fillColor = '#A10000';
      } else if (value >= 11.2 && value < 11.3) {
        fillColor = '#9C0000';
      } else if (value >= 11.3 && value < 11.4) {
        fillColor = '#970000';
      } else if (value >= 11.4 && value < 11.5) {
        fillColor = '#920000';
      } else if (value >= 11.5 && value < 11.6) {
        fillColor = '#8D0000';
      } else if (value >= 11.6 && value < 11.7) {
        fillColor = '#870000';
      } else if (value >= 11.7 && value < 11.8) {
        fillColor = '#820000';
      } else if (value >= 11.8 && value < 12) {
        fillColor = '#7D0000';
      } else if (value >= 12 && value < 12.1) {
        fillColor = '#820082';
      } else if (value >= 12.1 && value < 12.2) {
        fillColor = '#850285';
      } else if (value >= 12.2 && value < 12.3) {
        fillColor = '#870587';
      } else if (value >= 12.3 && value < 12.4) {
        fillColor = '#8A078A';
      } else if (value >= 12.4 && value < 12.5) {
        fillColor = '#8C098C';
      } else if (value >= 12.5 && value < 12.6) {
        fillColor = '#8F0B8F';
      } else if (value >= 12.6 && value < 12.7) {
        fillColor = '#910E91';
      } else if (value >= 12.7 && value < 13) {
        fillColor = '#941094';
      } else if (value >= 13 && value < 13.1) {
        fillColor = '#961296';
      } else if (value >= 13.1 && value < 13.2) {
        fillColor = '#991499';
      } else if (value >= 13.2 && value < 13.3) {
        fillColor = '#9B179B';
      } else if (value >= 13.3 && value < 13.4) {
        fillColor = '#9E199E';
      } else if (value >= 13.4 && value < 13.5) {
        fillColor = '#A01BA0';
      } else if (value >= 13.5 && value < 13.6) {
        fillColor = '#A31DA3';
      } else if (value >= 13.6 && value < 13.7) {
        fillColor = '#A520A5';
      } else if (value >= 13.8 && value < 13.9) {
        fillColor = '#A822A8';
      } else if (value >= 13.9 && value < 14) {
        fillColor = '#AA24AA';
      } else if (value >= 14 && value < 14.1) {
        fillColor = '#AD27AD';
      } else if (value >= 14.1 && value < 14.2) {
        fillColor = '#B029B0';
      } else if (value >= 14.2 && value < 14.3) {
        fillColor = '#B22BB2';
      } else if (value >= 14.3 && value < 14.4) {
        fillColor = '#B52DB5';
      } else if (value >= 14.4 && value < 14.5) {
        fillColor = '#B730B7';
      } else if (value >= 14.5 && value < 14.6) {
        fillColor = '#BA32BA';
      } else if (value >= 14.6 && value < 14.7) {
        fillColor = '#BC34BC';
      } else if (value >= 14.7 && value < 15) {
        fillColor = '#BF36BF';
      } else if (value >= 15 && value < 15.1) {
        fillColor = '#C139C1';
      } else if (value >= 15.1 && value < 15.2) {
        fillColor = '#C43BC4';
      } else if (value >= 15.2 && value < 15.3) {
        fillColor = '#C63DC6';
      } else if (value >= 15.3 && value < 15.4) {
        fillColor = '#C93FC9';
      } else if (value >= 15.4 && value < 15.5) {
        fillColor = '#CB42CB';
      } else if (value >= 15.5 && value < 15.6) {
        fillColor = '#CE44CE';
      } else if (value >= 15.6 && value < 15.7) {
        fillColor = '#D046D0';
      } else if (value >= 15.7 && value < 15.8) {
        fillColor = '#D348D3';
      } else if (value >= 15.8 && value < 16) {
        fillColor = '#D64BD6';
      } else if (value >= 16 && value < 16.1) {
        fillColor = '#D84DD8';
      } else if (value >= 16.1 && value < 16.2) {
        fillColor = '#DB4FDB';
      } else if (value >= 16.2 && value < 16.3) {
        fillColor = '#DD52DD';
      } else if (value >= 16.3 && value < 16.4) {
        fillColor = '#E054E0';
      } else if (value >= 16.4 && value < 16.5) {
        fillColor = '#E256E2';
      } else if (value >= 16.5 && value < 16.6) {
        fillColor = '#E558E5';
      } else if (value >= 16.6 && value < 16.7) {
        fillColor = '#E75BE7';
      } else if (value >= 16.7 && value < 17) {
        fillColor = '#EA5DEA';
      } else if (value >= 17 && value < 17.1) {
        fillColor = '#EC5FEC';
      } else if (value >= 17.1 && value < 17.2) {
        fillColor = '#EF61EF';
      } else if (value >= 17.2 && value < 17.3) {
        fillColor = '#F164F1';
      } else if (value >= 17.3 && value < 17.4) {
        fillColor = '#F466F4';
      } else if (value >= 17.4 && value < 17.5) {
        fillColor = '#F668F6';
      } else if (value >= 17.5 && value < 17.6) {
        fillColor = '#F96AF9';
      } else if (value >= 17.6 && value < 17.7) {
        fillColor = '#FB6DFB';
      } else if (value >= 17.7 && value < 18) {
        fillColor = '#FE6FFE';
      } else if (value >= 18 && value < 18.1) {
        fillColor = '#5B5B5B';
      } else if (value >= 18.1 && value < 18.2) {
        fillColor = '#5C5C5C';
      } else if (value >= 18.2 && value < 18.3) {
        fillColor = '#5E5E5E';
      } else if (value >= 18.3 && value < 18.4) {
        fillColor = '#5F5F5F';
      } else if (value >= 18.4 && value < 18.5) {
        fillColor = '#606060';
      } else if (value >= 18.5 && value < 18.6) {
        fillColor = '#616161';
      } else if (value >= 18.6 && value < 18.7) {
        fillColor = '#636363';
      } else if (value >= 18.7 && value < 19) {
        fillColor = '#646464';
      } else if (value >= 19 && value < 19.1) {
        fillColor = '#656565';
      } else if (value >= 19.1 && value < 19.2) {
        fillColor = '#666666';
      } else if (value >= 19.2 && value < 19.3) {
        fillColor = '#686868';
      } else if (value >= 19.3 && value < 19.4) {
        fillColor = '#696969';
      } else if (value >= 19.4 && value < 19.5) {
        fillColor = '#6A6A6A';
      } else if (value >= 19.5 && value < 19.6) {
        fillColor = '#6B6B6B';
      } else if (value >= 19.6 && value < 19.7) {
        fillColor = '#6D6D6D';
      } else if (value >= 19.7 && value < 19.8) {
        fillColor = '#6E6E6E';
      } else if (value >= 19.8 && value < 20) {
        fillColor = '#6F6F6F';
      } else if (value >= 20 && value < 20.1) {
        fillColor = '#717171';
      } else if (value >= 20.1 && value < 20.2) {
        fillColor = '#727272';
      } else if (value >= 20.2 && value < 20.3) {
        fillColor = '#737373';
      } else if (value >= 20.3 && value < 20.4) {
        fillColor = '#747474';
      } else if (value >= 20.4 && value < 20.5) {
        fillColor = '#767676';
      } else if (value >= 20.5 && value < 20.6) {
        fillColor = '#777777';
      } else if (value >= 20.6 && value < 20.7) {
        fillColor = '#787878';
      } else if (value >= 20.7 && value < 20.8) {
        fillColor = '#797979';
      } else if (value >= 20.8 && value < 21) {
        fillColor = '#7B7B7B';
      } else if (value >= 21 && value < 21.1) {
        fillColor = '#7C7C7C';
      } else if (value >= 21.1 && value < 21.2) {
        fillColor = '#7D7D7D';
      } else if (value >= 21.2 && value < 21.3) {
        fillColor = '#7E7E7E';
      } else if (value >= 21.3 && value < 21.4) {
        fillColor = '#808080';
      } else if (value >= 21.4 && value < 21.5) {
        fillColor = '#818181';
      } else if (value >= 21.5 && value < 21.6) {
        fillColor = '#838383';
      } else if (value >= 21.6 && value < 21.7) {
        fillColor = '#858585';
      } else if (value >= 21.7 && value < 22) {
        fillColor = '#868686';
      } else if (value >= 22 && value < 22.1) {
        fillColor = '#878787';
      } else if (value >= 22.1 && value < 22.2) {
        fillColor = '#898989';
      } else if (value >= 22.2 && value < 22.3) {
        fillColor = '#8A8A8A';
      } else if (value >= 22.3 && value < 22.4) {
        fillColor = '#8B8B8B';
      } else if (value >= 22.4 && value < 22.5) {
        fillColor = '#8C8C8C';
      } else if (value >= 22.5 && value < 22.6) {
        fillColor = '#8E8E8E';
      } else if (value >= 22.6 && value < 22.7) {
        fillColor = '#8F8F8F';
      } else if (value >= 22.7 && value < 22.8) {
        fillColor = '#909090';
      } else if (value >= 22.8 && value < 23) {
        fillColor = '#919191';
      } else if (value >= 23 && value < 23.1) {
        fillColor = '#939393';
      } else if (value >= 23.1 && value < 23.2) {
        fillColor = '#949494';
      } else if (value >= 23.2 && value < 23.3) {
        fillColor = '#959595';
      } else if (value >= 23.3 && value < 23.4) {
        fillColor = '#969696';
      } else if (value >= 23.4 && value < 23.5) {
        fillColor = '#989898';
      } else if (value >= 23.5 && value < 23.6) {
        fillColor = '#999999';
      } else if (value >= 23.6 && value < 24) {
        fillColor = '#9A9A9A';
      } else if (value >= 24 && value < 24.1) {
        fillColor = '#9C9C9C';
      } else if (value >= 24.1 && value < 24.2) {
        fillColor = '#9D9D9D';
      } else if (value >= 24.2 && value < 24.3) {
        fillColor = '#9E9E9E';
      } else if (value >= 24.3 && value < 24.4) {
        fillColor = '#9F9F9F';
      } else if (value >= 24.4 && value < 24.5) {
        fillColor = '#A1A1A1';
      } else if (value >= 24.5 && value < 24.6) {
        fillColor = '#A2A2A2';
      } else if (value >= 24.6 && value < 24.7) {
        fillColor = '#A3A3A3';
      } else if (value >= 24.7 && value < 24.8) {
        fillColor = '#A4A4A4';
      } else if (value >= 24.8 && value < 24.9) {
        fillColor = '#A6A6A6';
      } else if (value >= 24.9 && value < 25) {
        fillColor = '#A7A7A7';
      } else if (value >= 25 && value < 25.1) {
        fillColor = '#A8A8A8';
      } else if (value >= 25.1 && value < 25.2) {
        fillColor = '#A9A9A9';
      } else if (value >= 25.2 && value < 25.3) {
        fillColor = '#ABABAB';
      } else if (value >= 25.3 && value < 25.4) {
        fillColor = '#ACACAC';
      } else if (value >= 25.4 && value < 25.5) {
        fillColor = '#ADADAD';
      } else if (value >= 25.5 && value < 25.6) {
        fillColor = '#AEAEAE';
      } else if (value >= 25.6 && value < 25.7) {
        fillColor = '#B0B0B0';
      } else if (value >= 25.7 && value < 26) {
        fillColor = '#B1B1B1';
      } else if (value >= 26 && value < 26.1) {
        fillColor = '#B2B2B2';
      } else if (value >= 26.1 && value < 26.2) {
        fillColor = '#B4B4B4';
      } else if (value >= 26.2 && value < 26.3) {
        fillColor = '#B5B5B5';
      } else if (value >= 26.3 && value < 26.4) {
        fillColor = '#B6B6B6';
      } else if (value >= 26.4 && value < 26.5) {
        fillColor = '#B7B7B7';
      } else if (value >= 26.5 && value < 26.6) {
        fillColor = '#B9B9B9';
      } else if (value >= 26.6 && value < 26.7) {
        fillColor = '#BABABA';
      } else if (value >= 26.7 && value < 26.8) {
        fillColor = '#BBBBBB';
      } else if (value >= 26.8 && value < 26.9) {
        fillColor = '#BCBCBC';
      } else if (value >= 27 && value < 27.1) {
        fillColor = '#BEBEBE';
      } else if (value >= 27.1 && value < 27.2) {
        fillColor = '#BFBFBF';
      } else if (value >= 27.2 && value < 27.3) {
        fillColor = '#C0C0C0';
      } else if (value >= 27.3 && value < 27.4) {
        fillColor = '#C1C1C1';
      } else if (value >= 27.4 && value < 27.5) {
        fillColor = '#C3C3C3';
      } else if (value >= 27.5 && value < 27.6) {
        fillColor = '#C4C4C4';
      } else if (value >= 27.6 && value < 27.7) {
        fillColor = '#C5C5C5';
      } else if (value >= 27.7 && value < 28) {
        fillColor = '#C7C7C7';
      } else if (value >= 28 && value < 28.1) {
        fillColor = '#C8C8C8';
      } else if (value >= 28.1 && value < 28.2) {
        fillColor = '#C9C9C9';
      } else if (value >= 28.2 && value < 28.3) {
        fillColor = '#CACACA';
      } else if (value >= 28.3 && value < 28.4) {
        fillColor = '#CCCCCC';
      } else if (value >= 28.4 && value < 28.5) {
        fillColor = '#CDCDCD';
      } else if (value >= 28.5 && value < 28.6) {
        fillColor = '#CECECE';
      } else if (value >= 28.6 && value < 28.7) {
        fillColor = '#CFCFCF';
      } else if (value >= 28.7 && value < 29) {
        fillColor = '#D1D1D1';
      } else if (value >= 29 && value < 29.1) {
        fillColor = '#D2D2D2';
      } else if (value >= 29.1 && value < 29.2) {
        fillColor = '#D3D3D3';
      } else if (value >= 29.2 && value < 29.3) {
        fillColor = '#D4D4D4';
      } else if (value >= 29.3 && value < 29.4) {
        fillColor = '#D6D6D6';
      } else if (value >= 29.4 && value < 29.5) {
        fillColor = '#D7D7D7';
      } else if (value >= 29.5 && value < 29.6) {
        fillColor = '#D8D8D8';
      } else if (value >= 29.6 && value < 29.7) {
        fillColor = '#D9D9D9';
      } else if (value >= 29.7 && value < 30) {
        fillColor = '#DBDBDB';
      } else if (value >= 30) {
        fillColor = '#DCDCDC';
      }
    }
    fillColor = getESRISurgeLevelColor(Number.parseFloat(maxft));
    return {
      clickable: false,
      draggable: false,
      editable: false,
      fillColor: fillColor,
      fillOpacity: 0.7,
      strokeColor: fillColor,
      strokeWeight: 0.2,
      strokeOpacity: 0.7,
    };
  }

  deckSurgeStyleFunc(feature) {
    const maxft = feature.properties.maxft;
    let fillColor = '#fff';
    let fillOpacity = 0;
    if (maxft) {
      fillColor = '#005151';
      let value = Number.parseFloat(maxft);

      if (value === 0) {
        fillColor = '#004343';
      } else if (value >= 0.1 && value < 0.2) {
        fillColor = '#005151';
      } else if (value >= 0.2 && value < 0.3) {
        fillColor = '#006060';
      } else if (value >= 0.3 && value < 0.4) {
        fillColor = '#006E6E';
      } else if (value >= 0.4 && value < 0.5) {
        fillColor = '#007D7D';
      } else if (value >= 0.5 && value < 0.6) {
        fillColor = '#008B8B';
      } else if (value >= 0.6 && value < 0.7) {
        fillColor = '#009999';
      } else if (value >= 0.7 && value < 0.8) {
        fillColor = '#00A8A8';
      } else if (value >= 0.8 && value < 0.9) {
        fillColor = '#00B6B6';
      } else if (value >= 1 && value < 1.1) {
        fillColor = '#00C4C4';
      } else if (value >= 1.1 && value < 1.2) {
        fillColor = '#00D3D3';
      } else if (value >= 1.2 && value < 1.3) {
        fillColor = '#00E1E1';
      } else if (value >= 1.3 && value < 1.4) {
        fillColor = '#00F0F0';
      } else if (value >= 1.4 && value < 1.5) {
        fillColor = '#00FEFE';
      } else if (value >= 1.5 && value < 1.6) {
        fillColor = '#00F2E7';
      } else if (value >= 1.6 && value < 1.7) {
        fillColor = '#00E7D0';
      } else if (value >= 1.7 && value < 2) {
        fillColor = '#00DBB9';
      } else if (value >= 2 && value < 2.1) {
        fillColor = '#00D0A2';
      } else if (value >= 2.1 && value < 2.2) {
        fillColor = '#00C48B';
      } else if (value >= 2.2 && value < 2.3) {
        fillColor = '#00B973';
      } else if (value >= 2.3 && value < 2.4) {
        fillColor = '#00AD5C';
      } else if (value >= 2.4 && value < 2.5) {
        fillColor = '#00A245';
      } else if (value >= 2.5 && value < 2.6) {
        fillColor = '#00962E';
      } else if (value >= 2.6 && value < 2.7) {
        fillColor = '#008B17';
      } else if (value >= 2.7 && value < 3) {
        fillColor = '#007F00';
      } else if (value >= 3 && value < 3.1) {
        fillColor = '#FFFF00';
      } else if (value >= 3.1 && value < 3.2) {
        fillColor = '#FFFA00';
      } else if (value >= 3.2 && value < 3.3) {
        fillColor = '#FFF500';
      } else if (value >= 3.3 && value < 3.4) {
        fillColor = '#FFF000';
      } else if (value >= 3.4 && value < 3.5) {
        fillColor = '#FFEB00';
      } else if (value >= 3.5 && value < 3.6) {
        fillColor = '#FFE600';
      } else if (value >= 3.6 && value < 3.7) {
        fillColor = '#FFE100';
      } else if (value >= 3.7 && value < 3.8) {
        fillColor = '#FFDD00';
      } else if (value >= 3.8 && value < 4) {
        fillColor = '#FFD800';
      } else if (value >= 4 && value < 4.1) {
        fillColor = '#FFD300';
      } else if (value >= 4.1 && value < 4.2) {
        fillColor = '#FFCE00';
      } else if (value >= 4.2 && value < 4.3) {
        fillColor = '#FFC900';
      } else if (value >= 4.3 && value < 4.4) {
        fillColor = '#FFC400';
      } else if (value >= 4.4 && value < 4.5) {
        fillColor = '#FFBF00';
      } else if (value >= 4.5 && value < 4.6) {
        fillColor = '#FFBA00';
      } else if (value >= 4.6 && value < 4.7) {
        fillColor = '#FFB500';
      } else if (value >= 4.7 && value < 5.0) {
        fillColor = '#FFB000';
      } else if (value >= 5.0 && value < 5.1) {
        fillColor = '#FFAB00';
      } else if (value >= 5.1 && value < 5.2) {
        fillColor = '#FFA600';
      } else if (value >= 5.2 && value < 5.3) {
        fillColor = '#FFA100';
      } else if (value >= 5.3 && value < 5.4) {
        fillColor = '#FF9D00';
      } else if (value >= 5.4 && value < 5.5) {
        fillColor = '#FF9800';
      } else if (value >= 5.5 && value < 5.6) {
        fillColor = '#FF9300';
      } else if (value >= 5.6 && value < 5.7) {
        fillColor = '#FF8E00';
      } else if (value >= 5.7 && value < 5.8) {
        fillColor = '#FF8900';
      } else if (value >= 5.8 && value < 6) {
        fillColor = '#FF8400';
      } else if (value >= 6 && value < 6.1) {
        fillColor = '#FF7F00';
      } else if (value >= 6.1 && value < 6.2) {
        fillColor = '#FF7A00';
      } else if (value >= 6.2 && value < 6.3) {
        fillColor = '#FF7500';
      } else if (value >= 6.3 && value < 6.4) {
        fillColor = '#FF7000';
      } else if (value >= 6.4 && value < 6.5) {
        fillColor = '#FF6B00';
      } else if (value >= 6.5 && value < 6.6) {
        fillColor = '#FF6600';
      } else if (value >= 6.6 && value < 6.7) {
        fillColor = '#FF6100';
      } else if (value >= 6.7 && value < 7) {
        fillColor = '#FF5B00';
      } else if (value >= 7 && value < 7.1) {
        fillColor = '#FF5600';
      } else if (value >= 7.1 && value < 7.2) {
        fillColor = '#FF5100';
      } else if (value >= 7.2 && value < 7.3) {
        fillColor = '#FF4C00';
      } else if (value >= 7.3 && value < 7.4) {
        fillColor = '#FF4700';
      } else if (value >= 7.4 && value < 7.5) {
        fillColor = '#FF4200';
      } else if (value >= 7.5 && value < 7.6) {
        fillColor = '#FF3D00';
      } else if (value >= 7.6 && value < 7.7) {
        fillColor = '#FF3800';
      } else if (value >= 7.7 && value < 7.8) {
        fillColor = '#FF3300';
      } else if (value >= 7.8 && value < 8) {
        fillColor = '#FF2E00';
      } else if (value >= 8 && value < 8.1) {
        fillColor = '#FF2900';
      } else if (value >= 8.1 && value < 8.2) {
        fillColor = '#FF2400';
      } else if (value >= 8.2 && value < 8.3) {
        fillColor = '#FF1E00';
      } else if (value >= 8.3 && value < 8.4) {
        fillColor = '#FF1900';
      } else if (value >= 8.4 && value < 8.5) {
        fillColor = '#FF1400';
      } else if (value >= 8.5 && value < 8.6) {
        fillColor = '#FF0F00';
      } else if (value >= 8.6 && value < 8.7) {
        fillColor = '#FF0A00';
      } else if (value >= 8.7 && value < 9) {
        fillColor = '#FF0500';
      } else if (value >= 9 && value < 9.1) {
        fillColor = '#FF0000';
      } else if (value >= 9.1 && value < 9.2) {
        fillColor = '#FA0000';
      } else if (value >= 9.2 && value < 9.3) {
        fillColor = '#F50000';
      } else if (value >= 9.3 && value < 9.4) {
        fillColor = '#EF0000';
      } else if (value >= 9.4 && value < 9.5) {
        fillColor = '#EA0000';
      } else if (value >= 9.5 && value < 9.6) {
        fillColor = '#E50000';
      } else if (value >= 9.6 && value < 9.7) {
        fillColor = '#E00000';
      } else if (value >= 9.7 && value < 9.8) {
        fillColor = '#DB0000';
      } else if (value >= 9.8 && value < 10) {
        fillColor = '#D50000';
      } else if (value >= 10 && value < 10.1) {
        fillColor = '#D00000';
      } else if (value >= 10.1 && value < 10.2) {
        fillColor = '#CB0000';
      } else if (value >= 10.2 && value < 10.3) {
        fillColor = '#C60000';
      } else if (value >= 10.3 && value < 10.4) {
        fillColor = '#C10000';
      } else if (value >= 10.4 && value < 10.5) {
        fillColor = '#BB0000';
      } else if (value >= 10.5 && value < 10.6) {
        fillColor = '#B60000';
      } else if (value >= 10.6 && value < 10.7) {
        fillColor = '#B10000';
      } else if (value >= 10.7 && value < 11) {
        fillColor = '#AC0000';
      } else if (value >= 11 && value < 11.1) {
        fillColor = '#A70000';
      } else if (value >= 11.1 && value < 11.2) {
        fillColor = '#A10000';
      } else if (value >= 11.2 && value < 11.3) {
        fillColor = '#9C0000';
      } else if (value >= 11.3 && value < 11.4) {
        fillColor = '#970000';
      } else if (value >= 11.4 && value < 11.5) {
        fillColor = '#920000';
      } else if (value >= 11.5 && value < 11.6) {
        fillColor = '#8D0000';
      } else if (value >= 11.6 && value < 11.7) {
        fillColor = '#870000';
      } else if (value >= 11.7 && value < 11.8) {
        fillColor = '#820000';
      } else if (value >= 11.8 && value < 12) {
        fillColor = '#7D0000';
      } else if (value >= 12 && value < 12.1) {
        fillColor = '#820082';
      } else if (value >= 12.1 && value < 12.2) {
        fillColor = '#850285';
      } else if (value >= 12.2 && value < 12.3) {
        fillColor = '#870587';
      } else if (value >= 12.3 && value < 12.4) {
        fillColor = '#8A078A';
      } else if (value >= 12.4 && value < 12.5) {
        fillColor = '#8C098C';
      } else if (value >= 12.5 && value < 12.6) {
        fillColor = '#8F0B8F';
      } else if (value >= 12.6 && value < 12.7) {
        fillColor = '#910E91';
      } else if (value >= 12.7 && value < 13) {
        fillColor = '#941094';
      } else if (value >= 13 && value < 13.1) {
        fillColor = '#961296';
      } else if (value >= 13.1 && value < 13.2) {
        fillColor = '#991499';
      } else if (value >= 13.2 && value < 13.3) {
        fillColor = '#9B179B';
      } else if (value >= 13.3 && value < 13.4) {
        fillColor = '#9E199E';
      } else if (value >= 13.4 && value < 13.5) {
        fillColor = '#A01BA0';
      } else if (value >= 13.5 && value < 13.6) {
        fillColor = '#A31DA3';
      } else if (value >= 13.6 && value < 13.7) {
        fillColor = '#A520A5';
      } else if (value >= 13.8 && value < 13.9) {
        fillColor = '#A822A8';
      } else if (value >= 13.9 && value < 14) {
        fillColor = '#AA24AA';
      } else if (value >= 14 && value < 14.1) {
        fillColor = '#AD27AD';
      } else if (value >= 14.1 && value < 14.2) {
        fillColor = '#B029B0';
      } else if (value >= 14.2 && value < 14.3) {
        fillColor = '#B22BB2';
      } else if (value >= 14.3 && value < 14.4) {
        fillColor = '#B52DB5';
      } else if (value >= 14.4 && value < 14.5) {
        fillColor = '#B730B7';
      } else if (value >= 14.5 && value < 14.6) {
        fillColor = '#BA32BA';
      } else if (value >= 14.6 && value < 14.7) {
        fillColor = '#BC34BC';
      } else if (value >= 14.7 && value < 15) {
        fillColor = '#BF36BF';
      } else if (value >= 15 && value < 15.1) {
        fillColor = '#C139C1';
      } else if (value >= 15.1 && value < 15.2) {
        fillColor = '#C43BC4';
      } else if (value >= 15.2 && value < 15.3) {
        fillColor = '#C63DC6';
      } else if (value >= 15.3 && value < 15.4) {
        fillColor = '#C93FC9';
      } else if (value >= 15.4 && value < 15.5) {
        fillColor = '#CB42CB';
      } else if (value >= 15.5 && value < 15.6) {
        fillColor = '#CE44CE';
      } else if (value >= 15.6 && value < 15.7) {
        fillColor = '#D046D0';
      } else if (value >= 15.7 && value < 15.8) {
        fillColor = '#D348D3';
      } else if (value >= 15.8 && value < 16) {
        fillColor = '#D64BD6';
      } else if (value >= 16 && value < 16.1) {
        fillColor = '#D84DD8';
      } else if (value >= 16.1 && value < 16.2) {
        fillColor = '#DB4FDB';
      } else if (value >= 16.2 && value < 16.3) {
        fillColor = '#DD52DD';
      } else if (value >= 16.3 && value < 16.4) {
        fillColor = '#E054E0';
      } else if (value >= 16.4 && value < 16.5) {
        fillColor = '#E256E2';
      } else if (value >= 16.5 && value < 16.6) {
        fillColor = '#E558E5';
      } else if (value >= 16.6 && value < 16.7) {
        fillColor = '#E75BE7';
      } else if (value >= 16.7 && value < 17) {
        fillColor = '#EA5DEA';
      } else if (value >= 17 && value < 17.1) {
        fillColor = '#EC5FEC';
      } else if (value >= 17.1 && value < 17.2) {
        fillColor = '#EF61EF';
      } else if (value >= 17.2 && value < 17.3) {
        fillColor = '#F164F1';
      } else if (value >= 17.3 && value < 17.4) {
        fillColor = '#F466F4';
      } else if (value >= 17.4 && value < 17.5) {
        fillColor = '#F668F6';
      } else if (value >= 17.5 && value < 17.6) {
        fillColor = '#F96AF9';
      } else if (value >= 17.6 && value < 17.7) {
        fillColor = '#FB6DFB';
      } else if (value >= 17.7 && value < 18) {
        fillColor = '#FE6FFE';
      } else if (value >= 18 && value < 18.1) {
        fillColor = '#5B5B5B';
      } else if (value >= 18.1 && value < 18.2) {
        fillColor = '#5C5C5C';
      } else if (value >= 18.2 && value < 18.3) {
        fillColor = '#5E5E5E';
      } else if (value >= 18.3 && value < 18.4) {
        fillColor = '#5F5F5F';
      } else if (value >= 18.4 && value < 18.5) {
        fillColor = '#606060';
      } else if (value >= 18.5 && value < 18.6) {
        fillColor = '#616161';
      } else if (value >= 18.6 && value < 18.7) {
        fillColor = '#636363';
      } else if (value >= 18.7 && value < 19) {
        fillColor = '#646464';
      } else if (value >= 19 && value < 19.1) {
        fillColor = '#656565';
      } else if (value >= 19.1 && value < 19.2) {
        fillColor = '#666666';
      } else if (value >= 19.2 && value < 19.3) {
        fillColor = '#686868';
      } else if (value >= 19.3 && value < 19.4) {
        fillColor = '#696969';
      } else if (value >= 19.4 && value < 19.5) {
        fillColor = '#6A6A6A';
      } else if (value >= 19.5 && value < 19.6) {
        fillColor = '#6B6B6B';
      } else if (value >= 19.6 && value < 19.7) {
        fillColor = '#6D6D6D';
      } else if (value >= 19.7 && value < 19.8) {
        fillColor = '#6E6E6E';
      } else if (value >= 19.8 && value < 20) {
        fillColor = '#6F6F6F';
      } else if (value >= 20 && value < 20.1) {
        fillColor = '#717171';
      } else if (value >= 20.1 && value < 20.2) {
        fillColor = '#727272';
      } else if (value >= 20.2 && value < 20.3) {
        fillColor = '#737373';
      } else if (value >= 20.3 && value < 20.4) {
        fillColor = '#747474';
      } else if (value >= 20.4 && value < 20.5) {
        fillColor = '#767676';
      } else if (value >= 20.5 && value < 20.6) {
        fillColor = '#777777';
      } else if (value >= 20.6 && value < 20.7) {
        fillColor = '#787878';
      } else if (value >= 20.7 && value < 20.8) {
        fillColor = '#797979';
      } else if (value >= 20.8 && value < 21) {
        fillColor = '#7B7B7B';
      } else if (value >= 21 && value < 21.1) {
        fillColor = '#7C7C7C';
      } else if (value >= 21.1 && value < 21.2) {
        fillColor = '#7D7D7D';
      } else if (value >= 21.2 && value < 21.3) {
        fillColor = '#7E7E7E';
      } else if (value >= 21.3 && value < 21.4) {
        fillColor = '#808080';
      } else if (value >= 21.4 && value < 21.5) {
        fillColor = '#818181';
      } else if (value >= 21.5 && value < 21.6) {
        fillColor = '#838383';
      } else if (value >= 21.6 && value < 21.7) {
        fillColor = '#858585';
      } else if (value >= 21.7 && value < 22) {
        fillColor = '#868686';
      } else if (value >= 22 && value < 22.1) {
        fillColor = '#878787';
      } else if (value >= 22.1 && value < 22.2) {
        fillColor = '#898989';
      } else if (value >= 22.2 && value < 22.3) {
        fillColor = '#8A8A8A';
      } else if (value >= 22.3 && value < 22.4) {
        fillColor = '#8B8B8B';
      } else if (value >= 22.4 && value < 22.5) {
        fillColor = '#8C8C8C';
      } else if (value >= 22.5 && value < 22.6) {
        fillColor = '#8E8E8E';
      } else if (value >= 22.6 && value < 22.7) {
        fillColor = '#8F8F8F';
      } else if (value >= 22.7 && value < 22.8) {
        fillColor = '#909090';
      } else if (value >= 22.8 && value < 23) {
        fillColor = '#919191';
      } else if (value >= 23 && value < 23.1) {
        fillColor = '#939393';
      } else if (value >= 23.1 && value < 23.2) {
        fillColor = '#949494';
      } else if (value >= 23.2 && value < 23.3) {
        fillColor = '#959595';
      } else if (value >= 23.3 && value < 23.4) {
        fillColor = '#969696';
      } else if (value >= 23.4 && value < 23.5) {
        fillColor = '#989898';
      } else if (value >= 23.5 && value < 23.6) {
        fillColor = '#999999';
      } else if (value >= 23.6 && value < 24) {
        fillColor = '#9A9A9A';
      } else if (value >= 24 && value < 24.1) {
        fillColor = '#9C9C9C';
      } else if (value >= 24.1 && value < 24.2) {
        fillColor = '#9D9D9D';
      } else if (value >= 24.2 && value < 24.3) {
        fillColor = '#9E9E9E';
      } else if (value >= 24.3 && value < 24.4) {
        fillColor = '#9F9F9F';
      } else if (value >= 24.4 && value < 24.5) {
        fillColor = '#A1A1A1';
      } else if (value >= 24.5 && value < 24.6) {
        fillColor = '#A2A2A2';
      } else if (value >= 24.6 && value < 24.7) {
        fillColor = '#A3A3A3';
      } else if (value >= 24.7 && value < 24.8) {
        fillColor = '#A4A4A4';
      } else if (value >= 24.8 && value < 24.9) {
        fillColor = '#A6A6A6';
      } else if (value >= 24.9 && value < 25) {
        fillColor = '#A7A7A7';
      } else if (value >= 25 && value < 25.1) {
        fillColor = '#A8A8A8';
      } else if (value >= 25.1 && value < 25.2) {
        fillColor = '#A9A9A9';
      } else if (value >= 25.2 && value < 25.3) {
        fillColor = '#ABABAB';
      } else if (value >= 25.3 && value < 25.4) {
        fillColor = '#ACACAC';
      } else if (value >= 25.4 && value < 25.5) {
        fillColor = '#ADADAD';
      } else if (value >= 25.5 && value < 25.6) {
        fillColor = '#AEAEAE';
      } else if (value >= 25.6 && value < 25.7) {
        fillColor = '#B0B0B0';
      } else if (value >= 25.7 && value < 26) {
        fillColor = '#B1B1B1';
      } else if (value >= 26 && value < 26.1) {
        fillColor = '#B2B2B2';
      } else if (value >= 26.1 && value < 26.2) {
        fillColor = '#B4B4B4';
      } else if (value >= 26.2 && value < 26.3) {
        fillColor = '#B5B5B5';
      } else if (value >= 26.3 && value < 26.4) {
        fillColor = '#B6B6B6';
      } else if (value >= 26.4 && value < 26.5) {
        fillColor = '#B7B7B7';
      } else if (value >= 26.5 && value < 26.6) {
        fillColor = '#B9B9B9';
      } else if (value >= 26.6 && value < 26.7) {
        fillColor = '#BABABA';
      } else if (value >= 26.7 && value < 26.8) {
        fillColor = '#BBBBBB';
      } else if (value >= 26.8 && value < 26.9) {
        fillColor = '#BCBCBC';
      } else if (value >= 27 && value < 27.1) {
        fillColor = '#BEBEBE';
      } else if (value >= 27.1 && value < 27.2) {
        fillColor = '#BFBFBF';
      } else if (value >= 27.2 && value < 27.3) {
        fillColor = '#C0C0C0';
      } else if (value >= 27.3 && value < 27.4) {
        fillColor = '#C1C1C1';
      } else if (value >= 27.4 && value < 27.5) {
        fillColor = '#C3C3C3';
      } else if (value >= 27.5 && value < 27.6) {
        fillColor = '#C4C4C4';
      } else if (value >= 27.6 && value < 27.7) {
        fillColor = '#C5C5C5';
      } else if (value >= 27.7 && value < 28) {
        fillColor = '#C7C7C7';
      } else if (value >= 28 && value < 28.1) {
        fillColor = '#C8C8C8';
      } else if (value >= 28.1 && value < 28.2) {
        fillColor = '#C9C9C9';
      } else if (value >= 28.2 && value < 28.3) {
        fillColor = '#CACACA';
      } else if (value >= 28.3 && value < 28.4) {
        fillColor = '#CCCCCC';
      } else if (value >= 28.4 && value < 28.5) {
        fillColor = '#CDCDCD';
      } else if (value >= 28.5 && value < 28.6) {
        fillColor = '#CECECE';
      } else if (value >= 28.6 && value < 28.7) {
        fillColor = '#CFCFCF';
      } else if (value >= 28.7 && value < 29) {
        fillColor = '#D1D1D1';
      } else if (value >= 29 && value < 29.1) {
        fillColor = '#D2D2D2';
      } else if (value >= 29.1 && value < 29.2) {
        fillColor = '#D3D3D3';
      } else if (value >= 29.2 && value < 29.3) {
        fillColor = '#D4D4D4';
      } else if (value >= 29.3 && value < 29.4) {
        fillColor = '#D6D6D6';
      } else if (value >= 29.4 && value < 29.5) {
        fillColor = '#D7D7D7';
      } else if (value >= 29.5 && value < 29.6) {
        fillColor = '#D8D8D8';
      } else if (value >= 29.6 && value < 29.7) {
        fillColor = '#D9D9D9';
      } else if (value >= 29.7 && value < 30) {
        fillColor = '#DBDBDB';
      } else if (value >= 30) {
        fillColor = '#DCDCDC';
      }
    }
    return fillColor;
  }

  mapReady(map) {
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

    console.log('map ready');

    // @ts-ignore TODO(jpoehnelt) fix deckgl typings
    // const deckOverlay = new deck.GoogleMapsOverlay({
    //   layers: [
    //     // @ts-ignore TODO(jpoehnelt) fix deckgl typings
    //     new deck.GeoJsonLayer({
    //       id: 'earthquakes',
    //       data: this.surgeGeoJSON,
    //       filled: true,
    //       pointRadiusMinPixels: 2,
    //       pointRadiusMaxPixels: 200,
    //       opacity: 0.4,
    //       pointRadiusScale: 0.3,
    //       getRadius: (f: any) => Math.pow(10, f.properties.mag),
    //       getFillColor: (f) => {
    //         const { red, green, blue } = hexRgb(this.deckSurgeStyleFunc(f));
    //         return [red, green, blue, 255];
    //       },
    //       autoHighlight: true,
    //       transitions: {
    //         getRadius: {
    //           type: 'spring',
    //           stiffness: 0.1,
    //           damping: 0.15,
    //           enter: (_) => [0], // grow from size 0,
    //           duration: 10000,
    //         },
    //       },
    //       onDataLoad: (_) => {
    //         // @ts-ignore defined in include
    //         progress.done(); // hides progress bar
    //       },
    //     }),
    //   ],
    // });

    // deckOverlay.setMap(map);

    let windy;

    let timer;

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

    this.canvasLayer = new CanvasLayer(canvasLayerOptions);
    this.canvasLayer.setMap(null);

    windy = new Windy({
      canvas: this.canvasLayer.canvas,
      data: this.windData,
    });

    //prepare context var
    let context = this.canvasLayer.canvas.getContext('2d');

    google.maps.event.addListener(map, 'bounds_changed', function () {
      windy.stop();
      context.clearRect(0, 0, 3000, 3000);
    });
  }

  sortByForecastLongDate(fa, fb) {
    const dateFormat = 'YYYY-M-D h:mm A ddd [CDT]';
    const propName = 'FLDATELBL';
    const d1 = moment(fa.properties[propName], dateFormat);
    const d2 = moment(fb.properties[propName], dateFormat);
    if (d1.isAfter(d2)) {
      return -1;
    }
    if (d1.isBefore(d2)) {
      return 1;
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
}
