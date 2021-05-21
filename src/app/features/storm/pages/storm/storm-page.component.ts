import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '@env';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { WindRiskLevels } from '../../common/constants';
import { TimeUtils } from '../../common/utils';
import { actionStormDataFetchRequest } from '../../store/storm.actions';
import { selectStormData } from '../../store/storm.selectors';

import { QrStormService } from '../../services/storm.service';
import { QrIdentityService } from '@app/features/identity/services/identity.service';
import { selectSignedUser } from '@app/features/identity/store/identity.selectors';
import { filter, map, take } from 'rxjs/operators';
import { StormData } from '../../models/storm.models';
import { actionSignInRequest } from '@app/features/identity/store/identity.actions';
import { selectIdentityState } from '../../../identity/store/identity.selectors';

@Component({
  selector: 'qr-storm-page',
  templateUrl: './storm-page.component.html',
  styleUrls: ['./storm-page.component.css'],
})
export class QrStormPageComponent implements OnInit {
  mapMode = 'summary';
  loadingMap = true;
  mapZoom = 4;
  mapRestriction: google.maps.MapRestriction = {
    latLngBounds: {
      north: 60,
      south: 5,
      west: -120,
      east: -30,
    },
    strictBounds: true,
  };

  stormData$: Observable<StormData> = this.store.select(selectStormData);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      .select(selectSignedUser)
      .pipe(take(1))
      .subscribe((signedUser) =>
        this.store.dispatch(actionStormDataFetchRequest())
      );
  }

  onMapModeChange(mode) {
    this.mapMode = mode;
  }

  onMapLoaded($event) {
    this.loadingMap = false;
  }
}
