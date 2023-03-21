import { Component, OnInit } from '@angular/core';
import {ClientsService} from "../services/clients.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable, Subscription, throwError} from "rxjs";
import {Client} from "../model/client.model";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, map} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  clients! : Observable<Client>;
  editFormGroup : FormGroup;
  idClient : string;
  errorMessage: string;
  clientModel : Subscription;
  model : Client
  clicked: boolean;
  constructor(
    private clientService : ClientsService,
    private editFB : FormBuilder,
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
    this.idClient = this.activatedRoute.snapshot.paramMap.get('id');
    this.clientService.getOneClient(Number(this.idClient)).subscribe({
      next : value => {
        this.editFormGroup = this.editFB.group(
          {
            nom : this.editFB.control(value.nom),
            email : this.editFB.control(value.email),
            tel : this.editFB.control(value.tel)
          });
      },
      error : err => {
        throwError(err);
      }
    });
  }

  saveClients() {
    let client:Client = this.editFormGroup.value;
    client.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.clientService.creerClient(client).subscribe({
      next : data => {
        this.toastr.success("Modification Client", "Succès");
        this.router.navigateByUrl("/clients");
      },
      error : err => {
        this.toastr.error("Problème d'accès au serveur","Erreur" );
        console.log(err);
      }
    })
  }

}
