import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';

import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    /**
     * if username is not set in  the authentication service => user is not signed in
     * redirect to login page
     * return false
     */
    if (!this.authService.username && state.url !== '/login') {
      this.router.navigate(['/login']);
      return false;
    } else if (state.url === '/login') {
      /**
       * if username is set and user tried to go to login page
       * redirect to chat
       * return false
       */
      this.router.navigate(['/chat']);
      return false;
    }

    return true;
  }
}
