import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable()

export class AdminGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    if (localStorage.getItem('accessToken') != null) {
      return true;
    } else {
      return this.router.parseUrl('/auth/login');
    }
  }
}
