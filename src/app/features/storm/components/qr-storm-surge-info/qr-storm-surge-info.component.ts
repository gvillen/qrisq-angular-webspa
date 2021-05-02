import { Component, Input, OnInit } from '@angular/core';
import { SurgeRiskLevels } from '../../common/constants';

@Component({
  selector: 'qr-storm-surge-info',
  templateUrl: './qr-storm-surge-info.component.html',
  styleUrls: ['./qr-storm-surge-info.component.css'],
})
export class QrStormSurgeInfoComponent implements OnInit {
  @Input() stormName: string;
  @Input() userAddress: string;
  @Input() surgeRisk: string;
  @Input() advisoryDate: string;
  @Input() landfallDate: Date;
  @Input() landfallLocation: string;
  @Input() stormDistance: number;

  levels = SurgeRiskLevels;

  constructor() {}

  ngOnInit() {}
}
