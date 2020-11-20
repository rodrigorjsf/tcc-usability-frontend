import { Injectable } from '@angular/core';

import { AuthToken } from './token';
import { AuthTokenParceler } from './token-parceler';

export abstract class TokenStorage {

  abstract get(): AuthToken;
  abstract set(token: AuthToken);
  abstract clear();
}

@Injectable()
export class TokenLocalStorage extends TokenStorage {

  protected key = 'auth_app_token';

  constructor(private parceler: AuthTokenParceler) {
    super();
  }

  get(): AuthToken {
    const raw = localStorage.getItem(this.key);
    return this.parceler.unwrap(raw);
  }

  set(token: AuthToken) {
    const raw = this.parceler.wrap(token);
    localStorage.setItem(this.key, raw);
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}
