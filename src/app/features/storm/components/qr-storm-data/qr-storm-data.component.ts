import { Component, Input, OnInit } from '@angular/core';
import { WindRiskLevels, SurgeRiskLevels } from '../../common/constants';
import { TimeUtils } from '../../common/utils';

@Component({
  selector: 'qr-storm-data',
  templateUrl: './qr-storm-data.component.html',
  styleUrls: ['./qr-storm-data.component.css'],
})
export class QrStormDataComponent implements OnInit {
  @Input() mode: string;
  @Input() stormName: string;
  @Input() userAddress: string;
  @Input() surgeRisk: string;
  @Input() windRisk: string;
  @Input() advisoryDate: string;
  @Input() landfallDate: Date;
  @Input() landfallLocation: string;
  @Input() stormDistance: number;

  public get windLevels() {
    return WindRiskLevels;
  }

  public get surgeLevels() {
    return SurgeRiskLevels;
  }

  constructor() {}

  ngOnInit() {
    console.log(this.windLevels);
    console.log(this.surgeLevels);
  }

  toCDT(date) {
    return TimeUtils.toCDT(date);
  }
}
