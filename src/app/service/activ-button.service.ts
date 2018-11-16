import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActivButtonService implements CanActivate {
  activButton: Boolean;
  constructor(private authService: AuthService) {}
  canActivate(): boolean {
    if (this.authService.user) {
      console.log(this.authService.user);
      return true;
    } else {
      return false;
    }
  }
}
