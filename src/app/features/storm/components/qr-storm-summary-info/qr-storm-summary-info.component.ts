// angular
import { Component, Input, OnInit } from '@angular/core';

// constants
import { SurgeRiskLevels } from '@app/features/storm/common/constants';

// utils
import { TimeUtils } from '../../common/utils';

@Component({
  selector: 'qr-storm-summary-info',
  templateUrl: './qr-storm-summary-info.component.html',
  styleUrls: ['./qr-storm-summary-info.component.css'],
})
export class QrStormSummaryInfoComponent implements OnInit {
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

  toCDT(date) {
    return TimeUtils.toCDT(date);
  }
}
