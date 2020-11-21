import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthActionsType, AuthSignInFailure, AuthSignInRequest, AuthSignInSuccess} from './auth.actions';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router,
              private toastr: ToastrService) {}

  @Effect()
  authSignInRequest = this.actions$.pipe(
    ofType<AuthSignInRequest>(AuthActionsType.AUTH_SIGN_IN_REQUEST),
    exhaustMap(({ payload }) => this.authService.getUserByUsernameAndPassword(payload).pipe(
      map(auth => new AuthSignInSuccess(auth)),
      catchError(err => of(new AuthSignInFailure(err))),
    )),
  );

  @Effect({ dispatch: false })
  authSignInSuccess = this.actions$.pipe(
    ofType(AuthActionsType.AUTH_SIGN_IN_SUCCESS),
    tap(() => this.router.navigate(['/'])),
  );

  @Effect({ dispatch: false })
  authSignInFailure = this.actions$.pipe(
    ofType<AuthSignInFailure>(AuthActionsType.AUTH_SIGN_IN_FAILURE),
    tap(({ error }) => this.toastr.warning('Houve um erro')),
  );
}
