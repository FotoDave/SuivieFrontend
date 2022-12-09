import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {SecurityService} from "./security.service";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InterceptorsService{

  constructor(
    //private authService : SecurityService
  ) { }

  /*intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //let authService = this.injector.get(SecurityService);
    if(request.url != environment.backendHost+"/login"
      && request.url != environment.backendHost+"/refreshToken"){
      request.headers
        .set('Authorization','Bearer '+localStorage.getItem('access'))
        .set('Content-Type','application/json');
    }
    return next.handle(request).pipe(
      catchError(err => {
        /!*if (err.status === 403){
        }*!/
          this.authService.refreshToken().subscribe({
            next:value => {
              this.authService.storeTokens(value);
            },
            error:err1 => {
              this.authService.logOut();
              throwError(err1)
            }
          })
        return throwError(err)
      }
      ));
  }*/
}
