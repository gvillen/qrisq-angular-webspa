import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { StormData } from '../models/StormData.models';
import { StormDataHttpResponse } from '../models/StormDataHttpResponse.models';
import { QrStormDataService } from '../services/StormData.service';
import {
  actionStormDataFetchRequest,
  actionStormDataFetchRequestSuccess,
} from './storm.actions';
import moment from 'moment';
import { forkJoin } from 'rxjs';

@Injectable()
export class QrStormEffects {
  constructor(
    private actions$: Actions,
    private stormService: QrStormDataService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  effectHurricaneDataFetchRequest = createEffect(() =>
    this.actions$.pipe(
      ofType(actionStormDataFetchRequest),
      switchMap((action) =>
        this.stormService.fetchStormData(action.userId, action.accessToken)
      ),
      take(1),
      map((stormData) => actionStormDataFetchRequestSuccess({ stormData }))
    )
  );
}
// map((result: StormDataHttpResponse) => {
//   const stormData: StormData = {
//     lattitude: Number.parseFloat(result.latitude),
//     longitude: Number.parseFloat(result.longitude),
//     address: result.address,
//     clientId: result.client_id,
//     surgeRisk: result.surgerisk,
//     maxFlood: Number.parseFloat(result.maxflood),
//     advisoryDate: result.advisory_date,
//     nextAdvisoryDate: result.next_advisory_date,
//     landfallDate: moment(result.landfall_datetime).toDate(),
//     landfallLocation: result.landfall_location,
//     stormDistance: Number.parseFloat(result.storm_distance),
//     stormName: result.storm_name,
//     windRisk: result.windrisk,
//     lineGeoJSON: JSON.parse(result.line_data),
//     pointsGeoJSON: JSON.parse(result.points_data),
//     polygonsGeoJSON: JSON.parse(result.polygon_data),
//   };)),
