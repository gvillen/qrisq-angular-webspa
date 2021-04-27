import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { StormService } from '../services/storm.service';
import {
  actionStormDataFetchRequest,
  actionStormDataFetchRequestSuccess,
} from './storm.actions';
import { StormData } from './storm.models';

@Injectable()
export class HurricaneViewerEffects {
  constructor(
    private actions$: Actions,
    private hurricaneViewerService: StormService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  effectHurricaneDataFetchRequest = createEffect(() =>
    this.actions$.pipe(
      ofType(actionStormDataFetchRequest),
      switchMap((action) =>
        this.hurricaneViewerService.fetchHurricaneData(action.userId).pipe(
          take(1),
          map((result: StormData) =>
            actionStormDataFetchRequestSuccess({ stormData: result })
          )
        )
      )
    )
  );
}
