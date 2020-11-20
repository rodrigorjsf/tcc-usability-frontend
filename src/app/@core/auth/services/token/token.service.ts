import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of as observableOf } from 'rxjs';
import { filter, share } from 'rxjs/operators';

import { TokenStorage } from './token-storage';
import { AuthToken } from './token';

@Injectable()
export class TokenService {

  protected token$: BehaviorSubject<AuthToken> = new BehaviorSubject(null);

  constructor(protected tokenStorage: TokenStorage) {
    this.publishStoredToken();
  }

  tokenChange(): Observable<AuthToken> {
    return this.token$
      .pipe(
        filter(value => !!value),
        share(),
      );
  }

  set(token: AuthToken): Observable<null> {
    this.tokenStorage.set(token);
    this.publishStoredToken();
    return observableOf(null);
  }

  get(): Observable<AuthToken> {
    const token = this.tokenStorage.get();
    return observableOf(token);
  }

  clear(): Observable<null> {
    this.tokenStorage.clear();
    this.publishStoredToken();
    return observableOf(null);
  }

  protected publishStoredToken() {
    this.token$.next(this.tokenStorage.get());
  }
}
