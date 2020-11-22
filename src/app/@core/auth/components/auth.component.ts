import {Component, OnDestroy} from '@angular/core';
import {Location} from '@angular/common';

import {AuthService} from '../services/auth.service';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'pex-auth',
  styleUrls: ['./auth.component.scss'],
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-header>
            <nav class="navigation">
              <a href="#" (click)="back()" class="link back-link" aria-label="Back">
                <nb-icon icon="arrow-back"></nb-icon>
              </a>
            </nav>
          </nb-card-header>
          <nb-card-body>
            <pex-auth-block>
              <div class="logo-app">
              </div>

                <router-outlet></router-outlet>

            </pex-auth-block>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class AuthComponent implements OnDestroy {

  private alive = true;

  subscription: any;

  authenticated = false;
  token = '';

  constructor(protected auth: AuthService, protected location: Location) {

    this.subscription = auth.onAuthenticationChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe((authenticated: boolean) => {
        this.authenticated = authenticated;
      });
  }

  back() {
    this.location.back();
    return false;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
