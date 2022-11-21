import { Component, OnInit } from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Client} from "../model/client.model";
import {Observable, throwError} from "rxjs";
import {ClientsService} from "../services/clients.service";
import {ToastrService} from "ngx-toastr";
//import {ToastrService} from "ngx-toastr";
//import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
//import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients! : Observable<Array<Client>>;
  errorMessage! : string;
  searchFormGroup! : FormGroup;
  clientModel : Client;
  closeResult : string;

  constructor(
    private clientService : ClientsService,
    private searchFb : FormBuilder,
    private route : Router,
    private toastr : ToastrService
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

  deleteClient(c:Client) {
    this.clientService.deleteClient(c.id).subscribe({
      next : (value) => {
        this.clients = this.clients.pipe(
          map(data => {
            let index = data.indexOf(c);
            data.slice(index,1);
            return data;
          })
        );
        this.toastr.success("Suppression Client", "Succès");
        },
      error : err => {
        this.toastr.error("Problème d'accès au serveur","Erreur" );
        console.log(err);
      }
    });
  }

  infoClient(c: number) {
    this.route.navigateByUrl("clients/modifier/"+c);
  }
}
