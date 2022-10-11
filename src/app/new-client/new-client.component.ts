import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ClientsService} from "../services/clients.service";
import {Observable, throwError} from "rxjs";
import {Client} from "../model/client.model";
import {catchError} from "rxjs/operators";
import {error} from "protractor";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {
  clients! : Observable<Array<Client>>;
  saveFormGroup : FormGroup;
  errorMessage! : string;

  constructor(
    private clientService : ClientsService,
    private saveFb : FormBuilder,
    private clientModel : Client,
    private toatr : ToastrService
  ) { }

  ngOnInit(): void {
    this.saveFormGroup = this.saveFb.group(
      {
        nom : this.saveFb.control(""),
        email : this.saveFb.control(""),
        telephone : this.saveFb.control("")
      });
  }

  saveClients() {
    this.clientModel.nom = this.saveFormGroup.value.nom;
    this.clientModel.email = this.saveFormGroup.value.email;
    this.clientModel.tel = this.saveFormGroup.value.telephone;
    this.clientService.creerClient(this.clientModel).pipe(
      catchError(err => {
        this.errorMessage = "erreur";
        return throwError(err);
      })
    );
    this.toatr.success("Client créer avec success...", "Création client");

  }
}
