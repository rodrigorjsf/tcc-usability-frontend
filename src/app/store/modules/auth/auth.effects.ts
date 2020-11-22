import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthActionsType, AuthSignInFailure, AuthSignInRequest, AuthSignInSuccess} from './auth.actions';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {UserSignedInformation} from '../user/user.actions';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router,
              private toastr: ToastrService) {}

  @Effect()
  authSignInRequest = this.actions$.pipe(
    ofType<AuthSignInRequest>(AuthActionsType.AUTH_SIGN_IN_REQUEST),
    exhaustMap(({ payload }) => this.authService.getUserByUsernameAndPassword(payload).pipe(
      map(response => {
        const { status, body: auth } = response;
        const error = new HttpErrorResponse({ error: 'User not found' });
        return status === 204 ? new AuthSignInFailure(error) : new AuthSignInSuccess(auth);
      }),
      catchError(err => of(new AuthSignInFailure(err))),
    )),
  );

  @Effect()
  authSignInSuccess = this.actions$.pipe(
    ofType<AuthSignInSuccess>(AuthActionsType.AUTH_SIGN_IN_SUCCESS),
    map(({ payload }) => new UserSignedInformation(payload)),
    tap(() => this.router.navigate(['/pages/home'])),
  );

  @Effect({ dispatch: false })
  authSignInFailure = this.actions$.pipe(
    ofType<AuthSignInFailure>(AuthActionsType.AUTH_SIGN_IN_FAILURE),
    tap(({ error }) => this.toastr.warning(error.error)),
  );

  @Effect({ dispatch: false })
  authSignOut = this.actions$.pipe(
    ofType(AuthActionsType.AUTH_SIGN_OUT),
    tap(() => this.router.navigate(['/auth/login'])),
  );
}
