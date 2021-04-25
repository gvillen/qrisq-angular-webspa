import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { Params } from '@angular/router';
import { signUpReducer } from '@features/signup/store/signup.reducer';
import { SignUpState } from '@app/features/signup/store/signup.state';

export const reducers: ActionReducerMap<RootState> = {
  signup: signUpReducer,
  router: routerReducer,
};

export interface RootState {
  signup: SignUpState;
}

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface RootState {
  signup: SignUpState;
  router: RouterReducerState<RouterStateUrl>;
}
