import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { Params } from '@angular/router';

import { StormReducer } from '@app/features/storm/store/storm.reducer';
import { HurricaneViewerState } from '@app/features/storm/store/storm.state';
import { IdentityState } from '@app/features/identity/store/identity.models';
import { IdentityReducer } from '@app/features/identity/store/identity.reducer';

export const reducers: ActionReducerMap<RootState> = {
  identity: IdentityReducer,
  storm: StormReducer,
  router: routerReducer,
};

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface RootState {
  identity: IdentityState;
  storm: HurricaneViewerState;
  router: RouterReducerState<RouterStateUrl>;
}
