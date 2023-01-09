import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {TokenInterceptor} from "./token.interceptor";
import {SecurityService} from "../service/security.service";
import {catchError, filter, finalize, switchMap, take} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import {any} from "codelyzer/util/function";
import {environment} from "../../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  refreshingToken : boolean = false;
  jwtHelperService : JwtHelperService = new JwtHelperService();
  tokenSubject : BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private securityService : SecurityService,
    private toastr : ToastrService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
          if (err.status === 403) {
            localStorage.removeItem('access');
            if (!this.refreshingToken){
              this.refreshingToken = true;
              this.tokenSubject.next(null);

                return this.securityService.refreshToken().pipe(
                  switchMap(value => {
                    if (value) {
                      console.log("Token expiré")
                      console.log("Récupération du refresh token");
                      this.securityService.storeTokens(value);
                      this.tokenSubject.next(localStorage.getItem('access'));
                      const clone = request.clone({
                        headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access'))
                          .set('Content-Type', 'application/json')
                      });
                      return next.handle(clone);
                    }
                  }),
                  catchError(err1 => {
                    if (this.jwtHelperService.isTokenExpired(localStorage.getItem('refresh'))) {
                      this.toastr.info(`Veuillez vous reconnecter !`, `Session expirée`);
                      this.securityService.logOut();
                    } else {
                      this.toastr.error("Vous n'avez pas accès à cette ressource","Erreur");
                    }
                    return throwError(err1);
                  }),
                  finalize(() => {
                    this.refreshingToken = false;
                    let req = request.clone({
                      headers: request.headers.set('Authorization','Bearer '+localStorage.getItem('access'))
                        .set('Content-Type','application/json')
                    });
                    next.handle(req);
                  })
                );

            }
          }
        return throwError(err);
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
}
