import {Action} from '@ngrx/store';
import {RegisterUserRequestModel} from '../../../models/user.model';
import {HttpErrorResponse} from '@angular/common/http';

export enum UserActionsType {
  USER_REGISTER_REQUEST = '[USER] REGISTER REQUEST',
  USER_REGISTER_SUCCESS = '[USER] REGISTER SUCCESS',
  USER_REGISTER_FAILURE = '[USER] REGISTER FAILURE',
}

export class UserRegisterRequest implements Action {
  readonly type = UserActionsType.USER_REGISTER_REQUEST;
  constructor(public payload: RegisterUserRequestModel) {
  }
}

export class UserRegisterSuccess implements Action {
  readonly type = UserActionsType.USER_REGISTER_SUCCESS;
}

export class UserRegisterFailure implements Action {
  readonly type = UserActionsType.USER_REGISTER_FAILURE;
  constructor(public payload: HttpErrorResponse) {
  }
}

export type UserActions = UserRegisterSuccess | UserRegisterRequest | UserRegisterFailure;
