import { createAction, props } from '@ngrx/store';
import { StormData } from './storm.models';

export const actionStormDataFetchRequest = createAction(
  '[Hurricane Viewer] Storm Data Fetch Request',
  props<{ userId: string }>()
);

export const actionStormDataFetchRequestSuccess = createAction(
  '[Hurricane Viewer] Storm Data Fetch Request Success',
  props<{ stormData: StormData }>()
);

export const actionStormDataFetchRequestFailed = createAction(
  '[Hurricane Viewer] Storm Data Fetch Request Failed'
);
