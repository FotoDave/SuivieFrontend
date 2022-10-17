import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Client} from "../model/client.model";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SaveModel} from "../model/save.model";
import {Collaborateur} from "../../Collaborateur/model/collaborateur.model";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http : HttpClient) { }

  public getClient(): Observable<Array<Client>>{
    return this.http.get<Array<Client>>(environment.backendHost+'/clients')
  }

  public getOneClient(idClient : number ){
    return this.http.get<Client>(environment.backendHost+'/clients/'+idClient);
  }

  public searchClient(keyword : string): Observable<Array<Client>>{
    return this.http.get<Array<Client>>(environment.backendHost+'/clients/search?keyword='+keyword)
  }

  public creerClient(client: Client) : Observable<Client> {
    return this.http.post<Client>(environment.backendHost+'/clients', client);
  }

  public deleteClient(idClient : number ){
    return this.http.delete(environment.backendHost+'/clients/'+idClient);
  }

  public updateClient(client : Client, id : number) : Observable<Client>{
    return this.http.put<Client>(environment.backendHost+'/clients/'+id, client)
  }
}
