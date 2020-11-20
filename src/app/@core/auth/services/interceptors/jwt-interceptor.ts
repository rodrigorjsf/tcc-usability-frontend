import { Inject, Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthToken } from '../token/token';
import { AuthService } from '../auth.service';
import { PEX_AUTH_TOKEN_INTERCEPTOR_FILTER } from '../../auth.options';

@Injectable()
export class AuthJWTInterceptor implements HttpInterceptor {

  constructor(private injector: Injector,
              @Inject(PEX_AUTH_TOKEN_INTERCEPTOR_FILTER) protected filter) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (!this.filter(req)) {
        return this.authService.isAuthenticatedOrRefresh()
          .pipe(
            switchMap(authenticated => {
              if (authenticated) {
                  return this.authService.getToken().pipe(
                    switchMap((token: AuthToken) => {
                      const JWT = `Bearer ${token.getValue()}`;
                      req = req.clone({
                        setHeaders: {
                          Authorization: JWT,
                        },
                      });
                      return next.handle(req);
                    }),
                  );
              } else {
                return next.handle(req);
              }
            }),
          );
      } else {
      return next.handle(req);
    }
  }

  protected get authService(): AuthService {
    return this.injector.get(AuthService);
  }

}
