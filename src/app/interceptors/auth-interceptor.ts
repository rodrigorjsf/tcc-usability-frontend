import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {AppState} from '../store';
import {selectToken} from '../store/modules/auth/auth.selectors';
import {Observable} from 'rxjs';
import {SpinnerService} from '../services/spinner.service';
import {finalize} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token: string;
  constructor(private store: Store<AppState>, private spinner: SpinnerService) {
    this.store.select(selectToken).subscribe(token => this.token = token);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.showSpinner();
    if (this.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    }
    return next.handle(req).pipe(
      finalize(() => this.spinner.hideSpinner()),
    );
  }
}
