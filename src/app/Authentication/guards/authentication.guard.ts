import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {SecurityService} from "../service/security.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private securityService : SecurityService,
    private router : Router
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let authenticated = this.securityService.isAuthenticated();
    if (authenticated == false){
        this.router.navigateByUrl("/login");
        return false;
    } else {
      return true;
    }
  }

}
