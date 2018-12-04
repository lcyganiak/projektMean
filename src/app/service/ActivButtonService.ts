import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActivButtonService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const users = this.authService.user;
    if (users) {
      return true;
    }
    this.router.navigate(['login', { name: route.component['name'] }]);
    return false;
  }
}
