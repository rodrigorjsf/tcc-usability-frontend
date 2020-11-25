import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {UserActionsType, UserRegisterRequest} from './user.actions';

@Injectable()
export class UserEffects {
  @Effect()
  userRegisterRequest = this.actions$.pipe(
    ofType<UserRegisterRequest>(UserActionsType.USER_REGISTER_REQUEST),
  );

  constructor(private actions$: Actions) {
  }
}
