import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {ClientsService} from "../services/clients.service";
import {Client} from "../model/client.model";


@Component({
  selector: 'app-save-client',
  templateUrl: './save-client.component.html',
  styleUrls: ['./save-client.component.scss']
})
export class SaveClientComponent implements OnInit {
  clients! : Observable<Array<Client>>;
  saveFormGroup : FormGroup;
  constructor(
    private clientService : ClientsService,
    private saveFb : FormBuilder
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
    //this.clientModel.nom = this.saveFormGroup.value.nom;
    //this.clientModel.email = this.saveFormGroup.value.email;
    //this.clientModel.tel = this.saveFormGroup.value.telephone;
    let client:Client = this.saveFormGroup.value;
    this.clientService.creerClient(client).subscribe({
      next : data => {
        alert("Client creer");
      },
      error : err => {
        console.log(err);
      }
    })
  }

}
