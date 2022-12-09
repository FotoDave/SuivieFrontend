import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AppUser} from "../model/appUser.model";
import {Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {TokenModel} from "../model/token.model";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  appUser:AppUser;
  token : string;

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

  public refreshToken(){
    this.http.get<any>(environment.backendHost+"/refreshToken",{
      headers : new HttpHeaders().set('Authorization','Bearer '+localStorage.getItem("refresh"))
    }).subscribe({
      next:value => {
        console.log("Refresh token in process...!");
        this.storeTokens(value);
        console.log("Token raffraichit avec succèss");
      },
      error:err => {
        console.log("Refresh token expiré")
        this.logOut();
        throwError(err)
      }
    })
  }

  public isAuthenticated() : boolean{
    return localStorage.getItem('access') != null;
  }

  public storeTokens(token :TokenModel){
    localStorage.setItem('access', token.acces_token);
    localStorage.setItem('refresh', token.refresh_token);
  }

  public logOut(){
    localStorage.clear();
    this.router.navigateByUrl("/login")
  }

  public getUser(token:string) : Observable<AppUser>{
    return this.http.get<AppUser>(environment.backendHost+"/profile"/*,{
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
        .set('Authorization','Bearer '+token)
    }*/);
  }

  }

