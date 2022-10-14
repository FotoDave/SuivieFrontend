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
    return this.http.get<Array<Collaborateur>>(environment.backendHost+'/collaborateurs');
  }
}
