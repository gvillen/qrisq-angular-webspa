import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SignUp } from '../models/identity.models';

export interface IdentityState {
  signUp: SignUp;
  errors: Array<HttpErrorResponse>;
  loading: boolean;
}
