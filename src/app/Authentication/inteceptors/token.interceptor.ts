import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {SecurityService} from "../service/security.service";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AppUser} from "../model/appUser.model";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  jwtHelperService = new JwtHelperService();
  appUser : AppUser;
  constructor(
    private securityService : SecurityService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url == environment.backendHost + "/login") {
      localStorage.clear();
    }

    if (request.url == environment.backendHost+"/refreshToken"){
      let req = request.clone({
        headers: request.headers.set('Authorization','Bearer '+localStorage.getItem('refresh'))
          .set('Content-Type','application/json')
      });
      return next.handle(req);
    }

    if (request.url !== environment.backendHost+"/login" && request.url !== environment.backendHost+"/refreshToken"){
      if (localStorage.key(0) !== null){
        //console.log(this.securityService.getUser())
        console.log("Utilisateur connecté !");
        if (request.url == environment.backendHost+"/file"){
          const boundary = `----WebKitFormBoundary${Math.random().toString(36).substr(2)}`;
          console.log("Boundary : "+boundary);
          let clone = request.clone({
            headers: request.headers.set('Authorization','Bearer '+localStorage.getItem('access'))
              //.set('Content-Type', 'multipart/form-data; boundary='+boundary+'')
          });
          console.log("URL files");
          return next.handle(clone);
        }else {
          let clone = request.clone({
            headers: request.headers.set('Authorization','Bearer '+localStorage.getItem('access'))
              .set('Content-Type','application/json')
          });
          console.log(clone);
          return next.handle(clone);
        }
      }
    }

    return next.handle(request);
  }

}

  export const TokenInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
