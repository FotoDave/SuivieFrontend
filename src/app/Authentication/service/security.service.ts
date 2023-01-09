import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AppUser} from "../model/appUser.model";
import {Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {TokenModel} from "../model/token.model";
import {JwtConfig, JwtHelperService, JwtModule, JwtModuleOptions} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  appUser:AppUser;
  token : string;
  jwtHelperService = new JwtHelperService();

  constructor(
    private router : Router,
    private http : HttpClient
  ) { }

  public authenticateUser(username : string, password : string): Observable<TokenModel>{
        const user = new HttpParams()
          .set('username', username)
          .set('password', password);
        return this.http.post<any>(environment.backendHost+"/login", user.toString(),{
          headers: new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        });
  }

  public getUser(): AppUser{
    let token = localStorage.getItem('access');
    let user: Array<string>
    const decodeToken = this.jwtHelperService.decodeToken(token);
    //this.appUser.username = decodeToken.sub;
    //this.appUser.roles = decodeToken.roles;
    console.log(decodeToken.sub);
    console.log(decodeToken.roles);
    return this.appUser;
  }

  public refreshToken(){
    return this.http.get<any>(environment.backendHost+"/refreshToken"/*,{
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('refresh'))
    }*/);
  }

  public isAuthenticated() : boolean{
    if (localStorage.key(0) !== null){
      return true;
    } else{
      return false;
    }
  }

  public storeTokens(token :TokenModel){
    localStorage.setItem('access', token.acces_token);
    localStorage.setItem('refresh', token.refresh_token);
  }

  public logOut(){
    localStorage.clear();
    this.router.navigateByUrl("/login")
  }

  }

