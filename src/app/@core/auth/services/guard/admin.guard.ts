import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store';
import {selectSigned} from '../../../../store/modules/auth/auth.selectors';

@Injectable()

export class AdminGuard implements CanActivate {
  signed: boolean;
  constructor(private router: Router, private store: Store<AppState>) {
    this.store.select(selectSigned).subscribe(signed => this.signed = signed);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    if (this.signed) {
      return true;
    } else {
      return this.router.parseUrl('/auth/login');
    }
  }
}
