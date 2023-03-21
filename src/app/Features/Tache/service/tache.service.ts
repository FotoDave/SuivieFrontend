import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Tache} from "../model/tache.model";
import {environment} from "../../../../environments/environment";
import {SearchTache} from "../model/searchTache.model";
import {SecurityService} from "../../../Authentication/service/security.service";
import {catchError} from "rxjs/operators";
import {Fichier} from "../../../Files/model/file.model";

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(
    private http : HttpClient,
    private securityService : SecurityService
  ) { }

  public creerTache(tache : Tache):Observable<Tache>{
    return this.http.post<Tache>(environment.backendHost+"/taches", tache);
  }
  public getOneTache(id : number):Observable<Tache>{
    return this.http.get<Tache>(environment.backendHost+"/taches/"+id);
  }

  /*public getOneFile(element : string, id : number):Observable<Fichier>{
    let params = new HttpParams().set('id', id.toString())
                                  .set('element', element);
    return this.http.get<Fichier>(environment.backendHost+"/file", {
      params: params
    });
  }*/
  public listeTaches() : Observable<Array<Tache>>{
    return this.http.get<Array<Tache>>(environment.backendHost+"/taches");
  }

  public searchTacheByRequetteIdOrStatusTache(search : SearchTache):Observable<Array<Tache>>{
    let params = new HttpParams().set('requetteId', search.requetteId.toString()).set('statusTache', search.statusTache);
    return this.http.get<Array<Tache>>(environment.backendHost+"/taches/searchTache",{
      params: params
    });
  }

  public filterTaches(tache : Tache):Observable<Array<Tache>>{
    let params = new HttpParams().set('idTache', tache.id == null ? "" : tache.id.toString())
                            .set('idReq', tache.requetteId == null ? "" : tache.requetteId.toString())
                            .set('idCollab', tache.collaborateurId == null ? "" : tache.collaborateurId.toString())
                            .set('statut', tache.statusTache == null ? "" : tache.statusTache.toString())
                            .set('dateDebut', tache.dateDebut == null ? "" : tache.dateDebut.toString())
                            .set('dateFin', tache.dateFin == null ? "" : tache.dateFin.toString())
                            .set('dateDebutPrev', tache.debutPrevisionel == null ? "" : tache.debutPrevisionel.toString())
                            .set('dateFinPrev', tache.finPrevisionel == null ? "" : tache.finPrevisionel.toString());
    return this.http.get<Array<Tache>>(environment.backendHost+"/tache/filter",{
      params: params
    });
  }

  public planifierTache(tache : Tache) : Observable<Tache>{
    return this.http.put<Tache>(environment.backendHost+"/taches/planifier", tache);
  }
  public changeStatusTache(tache : Tache) : Observable<Tache>{
    return this.http.put<Tache>(environment.backendHost+"/taches/changeStatus", tache);
  }
  public modifierTache(tache : Tache) : Observable<Tache>{
    return this.http.put<Tache>(environment.backendHost+"/taches/modifier", tache);
  }
}
