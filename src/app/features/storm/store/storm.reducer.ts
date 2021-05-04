import { Action, createReducer, on } from '@ngrx/store';
import {
  actionStormDataFetchRequestFailed,
  actionStormDataFetchRequest,
  actionStormDataFetchRequestSuccess,
} from './storm.actions';
import { StormState, initialState } from './storm.state';

const reducer = createReducer(
  initialState,
  on(actionStormDataFetchRequest, (state, { userId }) => ({
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
  state: StormState | undefined,
  action: Action
): StormState {
  return reducer(state, action);
}
