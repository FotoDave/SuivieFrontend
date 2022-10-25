import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tache} from "../model/tache.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(
    private http : HttpClient
  ) { }

  public creerTache(tache : Tache):Observable<Tache>{
    return this.http.put<Tache>(environment.backendHost+"/taches", tache);
  }
  public getOneTache(id : number):Observable<Tache>{
    return this.http.get<Tache>(environment.backendHost+"/taches/"+id);
  }
}
