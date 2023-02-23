import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RequetteService} from "../service/requette.service";
import {CollaborateurService} from "../../Collaborateur/service/collaborateur.service";
import {Observable, throwError} from "rxjs";
import {Requette} from "../model/requette.model";
import {ClientsService} from "../../Client/services/clients.service";
import {Client} from "../../Client/model/client.model";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-filter-requette',
  templateUrl: './filter-requette.component.html',
  styleUrls: ['./filter-requette.component.scss']
})
export class FilterRequetteComponent implements OnInit {
  formGroup : FormGroup;
  @Input()
  requette : Observable<Array<Requette>>;
  requettes : Array<Requette>;
  clients : Array<Client>;

  constructor(
    private formBuilder : FormBuilder,
    private requetteService : RequetteService,
    private clientService : ClientsService
  ) { }

  ngOnInit(): void {
    this.requette.subscribe({
      next:value => {
        this.requettes = value;
      },
      error:err => {
        console.log("Erreur lors de la récupération des requettes dans le filtre");
        throwError(err);
      }
    });

    this.clientService.getClient().subscribe({
      next:value => {
        this.clients = value;
      },
      error:err => {
        console.log("Erreur lors de la récupération des clients dans le filtre");
        throwError(err);
      }
    });

    this.formGroup = this.formBuilder.group({
      id:this.formBuilder.control(""),
      clientId:this.formBuilder.control(""),
      typeRequette:this.formBuilder.control(""),
      statusTache:this.formBuilder.control(""),
      intitule:this.formBuilder.control("")
    });
  }

  filterRequette(){
    let req : Requette = this.formGroup.value;

    this.requette = this.requetteService.filterRequette(req).pipe(catchError(err => {
      console.log("Erreur lors du filtre des requettes...");
      return throwError(err);
    }));

    this.requetteService.filterRequette(req).subscribe({
      next: value => {
        console.log(value);
      },
      error: err => {
        console.log("Erreur lors du filtre des requettes...");
        throwError(err);
      }
    });
  }

}
