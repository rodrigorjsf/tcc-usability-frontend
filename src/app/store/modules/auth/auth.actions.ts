import {Action} from '@ngrx/store';
import {AuthSignInRequestModel, AuthSignInSuccessModel} from '../../../models/auth.model';
import {HttpErrorResponse} from '@angular/common/http';

export enum AuthActionsType {
  AUTH_SIGN_IN_REQUEST = '[AUTH] SIGN IN REQUEST',
  AUTH_SIGN_IN_SUCCESS = '[AUTH] SIGN IN SUCCESS',
  AUTH_SIGN_IN_FAILURE = '[AUTH] SIGN IN FAILURE',
}

export class AuthSignInRequest implements Action {
  readonly type = AuthActionsType.AUTH_SIGN_IN_REQUEST;
  constructor(public payload: AuthSignInRequestModel) {
  }
}

export class AuthSignInSuccess implements Action {
  readonly type = AuthActionsType.AUTH_SIGN_IN_SUCCESS;
  constructor(public payload: AuthSignInSuccessModel) {
  }
}

export class AuthSignInFailure implements Action {
  readonly type = AuthActionsType.AUTH_SIGN_IN_FAILURE;
  constructor(public error: HttpErrorResponse) {
  }
}

export type AuthActions = AuthSignInRequest | AuthSignInSuccess | AuthSignInFailure;
