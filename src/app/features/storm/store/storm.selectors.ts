import { RootState } from '@app/core/store/state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HurricaneViewerState } from './storm.state';

export const selectHurricaneViewerState = createFeatureSelector<
  RootState,
  HurricaneViewerState
>('storm');

export const selectStormData = createSelector(
  selectHurricaneViewerState,
  (state: HurricaneViewerState) => state.stormData
);
