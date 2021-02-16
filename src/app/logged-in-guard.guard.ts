import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuardGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const loggedIn: boolean = this.authService.isLoggedIn()
      console.log(loggedIn)
      if (loggedIn) {
        return true
      } else {
        this._router.navigate(['login'])
        return false
      }
    }

}
