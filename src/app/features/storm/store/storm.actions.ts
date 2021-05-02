import { createAction, props } from '@ngrx/store';
import { StormData } from '../models/StormData.models';

export const actionStormDataFetchRequest = createAction(
  '[Hurricane Viewer] Storm Data Fetch Request',
  props<{ userId: number; accessToken: string }>()
);

export const actionStormDataFetchRequestSuccess = createAction(
  '[Hurricane Viewer] Storm Data Fetch Request Success',
  props<{ stormData: StormData }>()
);

export const actionStormDataFetchRequestFailed = createAction(
  '[Hurricane Viewer] Storm Data Fetch Request Failed'
);
