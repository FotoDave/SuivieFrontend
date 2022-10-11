import { Component, OnInit } from '@angular/core';
import {ClientsService} from '../services/clients.service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Client} from '../model/client.model';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients! : Observable<Array<Client>>;
  errorMessage! : string;
  searchFormGroup! : FormGroup;
  closeResult : string;

  constructor(
    private clientService : ClientsService,
    private searchFb : FormBuilder,
    private modalService : NgbModal,
    private saveFb : FormBuilder
  ) { }

  ngOnInit(): void {

    this.searchFormGroup = this.searchFb.group({
      keyword : this.searchFb.control("")
    });

    this.clients = this.clientService.getClient().pipe(
      catchError(err => {
        this.errorMessage = "Connexion impossible avec la base de données";
        return throwError(err);
      })
    );
  }

  searchClients() {
    let kw = this.searchFormGroup.value.keyword
    this.clients = this.clientService.searchClient(kw).pipe(
      catchError(err => {
        this.errorMessage = "Connexion impossible avec la base de données";
        return throwError(err);
      })
    );
  }

  deleteClient(id: number) {
    this.clientService.deleteClient(id).pipe(
      catchError(err => {
        this.errorMessage = "Client not found";
        return throwError(err);
      })
    );

  }
}
