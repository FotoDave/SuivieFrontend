import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Collaborateur} from "../model/collaborateur.model";
import {environment} from "../../../../environments/environment";
import {Client} from "../../Client/model/client.model";

@Injectable({
  providedIn: 'root'
})
export class CollaborateurService {

  constructor(private http : HttpClient) { }

  public getCollaborateur(): Observable<Array<Collaborateur>>{
    console.log("recupération des collaaborateurs")
    return this.http.get<Array<Collaborateur>>(environment.backendHost+'/collaborateurs');
  }
  public deleteCollaborateur(id : number){
    return this.http.delete(environment.backendHost+'/collaborateurs/'+id);
  }

  public searchCollaborateur(kw : string): Observable<Array<Collaborateur>>{
    return this.http.get<Array<Collaborateur>>(environment.backendHost+'/collaborateurs/search?keyword='+kw);
  }

  public getOneCollaborateur(id : number): Observable<Collaborateur>{
    return this.http.get<Collaborateur>(environment.backendHost+'/collaborateurs/'+id);
  }

  public createCollab(collab : Collaborateur) : Observable<Collaborateur>{
    return this.http.post<Collaborateur>(environment.backendHost+'/collaborateurs',collab);
  }

  public updateCollab(collab : Collaborateur, id : number) : Observable<Collaborateur>{
    return this.http.put<Collaborateur>(environment.backendHost+'/collaborateurs/'+id, collab)
  }
}
