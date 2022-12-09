import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Requette} from "../model/requette.model";
import {environment} from "../../../../environments/environment";
import {catchError} from "rxjs/operators";
import {SecurityService} from "../../../Authentication/service/security.service";

@Injectable({
  providedIn: 'root'
})
export class RequetteService {

  constructor(
    private http : HttpClient,
    private securityService : SecurityService
  ) { }

  public getRequttes():Observable<Array<Requette>>{
    return this.http.get<Array<Requette>>(environment.backendHost+"/requettes",{
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('access'))
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, PUT, OPTIONS')
        .set('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
    }).pipe(
      catchError(err => {
        if (err.status == 403){
          this.securityService.refreshToken();
        }
        return throwError(err)
      })
    );
  }

  public getOneRequette(id: number):Observable<Requette>{
    return this.http.get<Requette>(environment.backendHost+"/requettes/"+id,{
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('access'))
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, PUT, OPTIONS')
        .set('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
    }).pipe(
      catchError(err => {
        if (err.status == 403){
          this.securityService.refreshToken();
        }
        return throwError(err)
      })
    );
  }

  public deleteRequtte(id: number){
    return this.http.delete(environment.backendHost+"/requettes/"+id);
  }

  public modifierRequette(requette : Requette, id : number): Observable<Requette>{
    return this.http.put<Requette>(environment.backendHost+"/requettes/"+id, requette,{
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('access'))
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, PUT, OPTIONS')
        .set('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
    }).pipe(
      catchError(err => {
        if (err.status == 403){
          this.securityService.refreshToken();
        }
        return throwError(err)
      })
    );
  }

  public createRequette(requette : Requette): Observable<Requette>{
    return this.http.post<Requette>(environment.backendHost+"/requettes", requette,{
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('access'))
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, PUT, OPTIONS')
        .set('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
    }).pipe(
      catchError(err => {
        if (err.status == 403){
          this.securityService.refreshToken();
        }
        return throwError(err)
      })
    );
  }
}
