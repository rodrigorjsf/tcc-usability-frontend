import {Action} from '@ngrx/store';
import {AuthSignInRequestModel, AuthSignInResponseModel} from '../../../models/auth.model';
import {HttpErrorResponse} from '@angular/common/http';

export enum AuthActionsType {
  AUTH_SIGN_IN_REQUEST = '[AUTH] SIGN IN REQUEST',
  AUTH_SIGN_IN_SUCCESS = '[AUTH] SIGN IN SUCCESS',
  AUTH_SIGN_IN_FAILURE = '[AUTH] SIGN IN FAILURE',
  AUTH_SIGN_OUT = '[AUTH] SIGN OUT',
}

export class AuthSignInRequest implements Action {
  readonly type = AuthActionsType.AUTH_SIGN_IN_REQUEST;
  constructor(public payload: AuthSignInRequestModel) {
  }
}

export class AuthSignInSuccess implements Action {
  readonly type = AuthActionsType.AUTH_SIGN_IN_SUCCESS;
  constructor(public payload: AuthSignInResponseModel) {
  }
}

export class AuthSignInFailure implements Action {
  readonly type = AuthActionsType.AUTH_SIGN_IN_FAILURE;
  constructor(public error: HttpErrorResponse) {
  }
}

export class AuthSignOut implements Action {
  readonly type = AuthActionsType.AUTH_SIGN_OUT;
}

export type AuthActions = AuthSignInRequest | AuthSignInSuccess | AuthSignInFailure | AuthSignOut;
