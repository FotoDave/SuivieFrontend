import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../model/client.model';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http : HttpClient) {

  }
  public getClient(): Observable<Array<Client>>{
    return this.http.get<Array<Client>>(environment.backendHost+'/clients')
  }

  public searchClient(keyword : string): Observable<Array<Client>>{
    return this.http.get<Array<Client>>(environment.backendHost+'/clients/search?keyword='+keyword)
  }

  public creerClient(client : Client) : Observable<Array<Client>> {
    return this.http.post<Array<Client>>(environment.backendHost + '/clients', client);
  }

  public deleteClient(idClient : number ){
    return this.http.delete(environment.backendHost +'/clients/{'+idClient+'}');
  }
}
