import { Inject, Injectable } from '@angular/core';

import { Observable, of as observableOf } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { AuthStrategy } from '../strategies/auth-strategy';
import { PEX_AUTH_STRATEGIES } from '../auth.options';
import { AuthResult } from './auth-result';
import { TokenService } from './token/token.service';
import { AuthToken } from './token/token';

@Injectable()
export class AuthService {

  constructor(protected tokenService: TokenService,
              @Inject(PEX_AUTH_STRATEGIES) protected strategies) {
  }

  getToken(): Observable<AuthToken> {
    return this.tokenService.get();
  }

  isAuthenticated(): Observable<boolean> {
    return this.getToken()
      .pipe(map((token: AuthToken) => token.isValid()));
  }

  isAuthenticatedOrRefresh(): Observable<boolean> {
    return this.getToken()
      .pipe(
        switchMap(token => {
          if (token.getValue() && !token.isValid()) {
            return this.refreshToken(token.getOwnerStrategyName(), token)
              .pipe(
                switchMap(res => {
                  if (res.isSuccess()) {
                    return this.isAuthenticated();
                  } else {
                    return observableOf(false);
                  }
                }),
              );
          } else {
            return observableOf(token.isValid());
          }
        }));
  }

  onTokenChange(): Observable<AuthToken> {
    return this.tokenService.tokenChange();
  }

  onAuthenticationChange(): Observable<boolean> {
    return this.onTokenChange()
      .pipe(map((token: AuthToken) => token.isValid()));
  }

  authenticate(strategyName: string, data?: any): Observable<AuthResult> {
    return this.getStrategy(strategyName).authenticate(data)
      .pipe(
        switchMap((result: AuthResult) => {
          return this.processResultToken(result);
        }),
      );
  }

  register(strategyName: string, data?: any): Observable<AuthResult> {
    return this.getStrategy(strategyName).register(data)
      .pipe(
        switchMap((result: AuthResult) => {
          return this.processResultToken(result);
        }),
      );
  }

  logout(strategyName: string): Observable<AuthResult> {
    return this.getStrategy(strategyName).logout()
      .pipe(
        switchMap((result: AuthResult) => {
          if (result.isSuccess()) {
            this.tokenService.clear()
              .pipe(map(() => result));
          }
          return observableOf(result);
        }),
      );
  }

  requestPassword(strategyName: string, data?: any): Observable<AuthResult> {
    return this.getStrategy(strategyName).requestPassword(data);
  }

  resetPassword(strategyName: string, data?: any): Observable<AuthResult> {
    return this.getStrategy(strategyName).resetPassword(data);
  }

  refreshToken(strategyName: string, data?: any): Observable<AuthResult> {
    return this.getStrategy(strategyName).refreshToken(data)
      .pipe(
        switchMap((result: AuthResult) => {
          return this.processResultToken(result);
        }),
      );
  }

  protected getStrategy(strategyName: string): AuthStrategy {
    const found = this.strategies.find((strategy: AuthStrategy) => strategy.getName() === strategyName);

    if (!found) {
      throw new TypeError(`There is no Auth Strategy registered under '${strategyName}' name`);
    }

    return found;
  }

  private processResultToken(result: AuthResult) {
    if (result.isSuccess() && result.getToken()) {
      return this.tokenService.set(result.getToken())
        .pipe(
          map((token: AuthToken) => {
            return result;
          }),
        );
    }

    return observableOf(result);
  }
}
