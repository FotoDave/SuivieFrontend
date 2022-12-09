import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Commentaire} from "../model/commentaire.model";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  constructor(
    private http : HttpClient
  ) { }

  public creerCommentaire(commentaire : Commentaire):Observable<Commentaire>{
    return this.http.post<Commentaire>(environment.backendHost+"/commentaires", commentaire);
  }
  public getOneCommentaire(id : number):Observable<Commentaire>{
    return this.http.get<Commentaire>(environment.backendHost+"/commentaires/"+id);
  }
  public listeCommentaire():Observable<Array<Commentaire>>{
    return this.http.get<Array<Commentaire>>(environment.backendHost+"/commentaires");
  }

  public listeCommentaireParTaches(id : number):Observable<Array<Commentaire>>{
    return this.http.get<Array<Commentaire>>(environment.backendHost+"/commentaires/taches/"+id);
  }
}
