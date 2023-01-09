import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  jwtHelperService = new JwtHelperService();
  decodedToken : any;
  constructor(

  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token : string = localStorage.getItem('access');
    this.decodedToken = this.jwtHelperService.decodeToken(token);

    if(this.decodedToken.roles == "Admin"){
      return true;
    } else {
      return false;
    }
  }

}
