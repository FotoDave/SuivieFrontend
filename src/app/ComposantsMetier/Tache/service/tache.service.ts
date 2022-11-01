import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
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
    return this.http.post<Tache>(environment.backendHost+"/taches", tache);
  }
  public getOneTache(id : number):Observable<Tache>{
    return this.http.get<Tache>(environment.backendHost+"/taches/"+id);
  }
  public listeTaches() : Observable<Array<Tache>>{
    return this.http.get<Array<Tache>>(environment.backendHost+"/taches");
  }

  public searchTacheByRequetteIdOrStatusTache(search : SearchTache):Observable<Array<Tache>>{
    console.log(search);
    let params = new HttpParams().set('requetteId', search.requetteId.toString()).set('statusTache', search.statusTache);
    return this.http.get<Array<Tache>>(environment.backendHost+"/taches/searchTache", {params: params});
  }
}
