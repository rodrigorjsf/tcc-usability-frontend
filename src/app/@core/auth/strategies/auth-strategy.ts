import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthResult} from '../services/auth-result';
import {AuthStrategyOptions} from './auth-strategy-options';
import {deepExtend, getDeepFromObject} from '../helpers';
import {authCreateToken, AuthIllegalTokenError, AuthToken,} from '../services/token/token';

export abstract class AuthStrategy {

  protected defaultOptions: AuthStrategyOptions;
  protected options: AuthStrategyOptions;

  setOptions(options: any): void {
    this.options = deepExtend({}, this.defaultOptions, options);
  }

  getOption(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  createToken<T extends AuthToken>(value: any, failWhenInvalidToken?: boolean): T {
    const token = authCreateToken<T>(this.getOption('token.class'), value, this.getName());
    if (failWhenInvalidToken && !token.isValid()) {
      throw new AuthIllegalTokenError('Token is empty or invalid.');
    }
    return token;
  }

  getName(): string {
    return this.getOption('name');
  }

  abstract authenticate(data?: any): Observable<AuthResult>;

  abstract register(data?: any): Observable<AuthResult>;

  abstract requestPassword(data?: any): Observable<AuthResult>;

  abstract resetPassword(data?: any): Observable<AuthResult>;

  abstract logout(): Observable<AuthResult>;

  abstract refreshToken(data?: any): Observable<AuthResult>;

  protected createFailResponse(data?: any): HttpResponse<Object> {
    return new HttpResponse<Object>({body: {}, status: 401});
  }

  protected createSuccessResponse(data?: any): HttpResponse<Object> {
    return new HttpResponse<Object>({body: {}, status: 200});
  }

  protected getActionEndpoint(action: string): string {
    const actionEndpoint: string = this.getOption(`${action}.endpoint`);
    const baseEndpoint: string = this.getOption('baseEndpoint');
    return actionEndpoint ? baseEndpoint + actionEndpoint : '';
  }
}
