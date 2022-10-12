import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Client} from "../model/client.model";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http : HttpClient) { }

  public getClient(): Observable<Array<Client>>{
    return this.http.get<Array<Client>>(environment.backendHost+'/clients')
  }

  public searchClient(keyword : string): Observable<Array<Client>>{
    return this.http.get<Array<Client>>(environment.backendHost+'/clients/search?keyword='+keyword)
  }

  public creerClient(client : Client) : Observable<Client> {
    return this.http.post<Client>(environment.backendHost+'/clients', client);
  }

  public deleteClient(idClient : number ){
    return this.http.delete(environment.backendHost+'/clients/'+idClient);
  }
}
