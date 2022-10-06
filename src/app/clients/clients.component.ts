import { Component, OnInit } from '@angular/core';
import {ClientsService} from '../services/clients.service';
import {Observable, throwError} from 'rxjs';
import {ClientModel} from '../model/client.model';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients! : Observable<Array<ClientModel>>;
  errorMessage! : string;
  constructor(private clientService : ClientsService) { }

  ngOnInit(): void {
    this.clients = this.clientService.getClient().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

}
