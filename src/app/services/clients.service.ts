import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ClientModel} from '../model/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http : HttpClient) {

  }
  public getClient(): Observable<Array<ClientModel>>{
    return this.http.get<Array<ClientModel>>('http://localhost:8085/clients')
  }
}
