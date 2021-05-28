import { Component, OnInit } from '@angular/core';
import { selectSignedUser } from '@app/features/identity/store/identity.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { StormData } from '../../models/storm.models';
import { actionStormDataFetchRequest } from '../../store/storm.actions';
import { selectStormData } from '../../store/storm.selectors';

@Component({
  selector: 'qr-storm-free-page',
  templateUrl: './storm-free.component.html',
  styleUrls: ['./storm-free.component.scss'],
})
export class QrStormFreePageComponent implements OnInit {
  mapMode = 'surge';
  loadingMap = true;
  isTrackAndConeChecked = true;
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
    this.store.dispatch(actionStormDataFetchRequest({ freeMode: true }));
  }

  onMapModeChange(mode) {
    this.mapMode = mode;
  }

  onTrackAndConeChanged(trackAndCone) {
    this.isTrackAndConeChecked = trackAndCone;
  }

  onMapLoaded($event) {
    this.loadingMap = false;
  }
}
