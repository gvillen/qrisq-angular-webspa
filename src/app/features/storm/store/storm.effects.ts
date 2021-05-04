import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';
import { QrStormService } from '../services/storm.service';
import {
  actionStormDataFetchRequest,
  actionStormDataFetchRequestSuccess,
} from './storm.actions';

@Injectable()
export class QrStormEffects {
  constructor(
    private actions$: Actions,
    private stormService: QrStormService
  ) {}

  effectHurricaneDataFetchRequest = createEffect(() =>
    this.actions$.pipe(
      ofType(actionStormDataFetchRequest),
      switchMap((action) => {
        console.log(action);
        return this.stormService.getStormData(action.userId).pipe(
          take(1),
          map((stormData) => actionStormDataFetchRequestSuccess({ stormData }))
        );
      })
    )
  );
}
