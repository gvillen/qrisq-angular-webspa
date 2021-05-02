import { HttpErrorResponse } from '@angular/common/http';
import { StormData } from '../models/StormData.models';

export interface HurricaneViewerState {
  stormData: StormData;
  errors: Array<HttpErrorResponse>;
  loading: boolean;
}

export const initialState: HurricaneViewerState = {
  stormData: null,
  errors: [],
  loading: false,
};
