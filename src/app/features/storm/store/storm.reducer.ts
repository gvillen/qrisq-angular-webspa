import { Action, createReducer, on } from '@ngrx/store';
import {
  actionStormDataFetchRequestFailed,
  actionStormDataFetchRequest,
  actionStormDataFetchRequestSuccess,
} from './storm.actions';
import { HurricaneViewerState, initialState } from './storm.state';

const reducer = createReducer(
  initialState,
  on(actionStormDataFetchRequest, (state, { userId, accessToken }) => ({
    ...state,
    loading: true,
  })),
  on(actionStormDataFetchRequestSuccess, (state, { stormData }) => ({
    ...state,
    stormData,
    loading: false,
  })),
  on(actionStormDataFetchRequestFailed, (state) => ({
    ...state,
    loading: false,
  }))
);

export function StormReducer(
  state: HurricaneViewerState | undefined,
  action: Action
): HurricaneViewerState {
  return reducer(state, action);
}
