import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tache} from "../model/tache.model";
import {environment} from "../../../../environments/environment";
import {SearchTache} from "../model/searchTache.model";

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(
    private http : HttpClient
  ) { }

  public creerTache(tache : Tache):Observable<Tache>{
    return this.http.post<Tache>(environment.backendHost+"/taches", tache, {
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('access'))
        .set('Access-Control-Allow-Origin','*')
        .set('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, PUT, OPTIONS')
        .set('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
    });
  }
  public getOneTache(id : number):Observable<Tache>{
    return this.http.get<Tache>(environment.backendHost+"/taches/"+id, {
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('access'))
        .set('Access-Control-Allow-Origin','*')
        .set('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, PUT, OPTIONS')
        .set('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
    });
  }
  public listeTaches() : Observable<Array<Tache>>{
    return this.http.get<Array<Tache>>(environment.backendHost+"/taches", {
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('access'))
        .set('Access-Control-Allow-Origin','*')
        .set('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, PUT, OPTIONS')
        .set('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
    });
  }

  public searchTacheByRequetteIdOrStatusTache(search : SearchTache):Observable<Array<Tache>>{
    console.log(search);
    let params = new HttpParams().set('requetteId', search.requetteId.toString()).set('statusTache', search.statusTache);
    return this.http.get<Array<Tache>>(environment.backendHost+"/taches/searchTache",{
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('access'))
        .set('Access-Control-Allow-Origin','*')
        .set('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, PUT, OPTIONS')
        .set('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'),
      params: params
    });
  }
  public planifierTache(tache : Tache) : Observable<Tache>{
    return this.http.put<Tache>(environment.backendHost+"/taches/planifier", tache,{
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('access'))
        .set('Access-Control-Allow-Origin','*')
        .set('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, PUT, OPTIONS')
        .set('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
    });
  }
  public modifierTache(tache : Tache) : Observable<Tache>{
    return this.http.put<Tache>(environment.backendHost+"/taches/modifier", tache,{
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
        .set('Authorization','Bearer '+localStorage.getItem('access'))
        .set('Access-Control-Allow-Origin','*')
        .set('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, PUT, OPTIONS')
        .set('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
    });
  }
}
