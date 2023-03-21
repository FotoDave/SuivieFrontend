import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TacheService} from "../service/tache.service";
import {Observable, throwError} from "rxjs";
import {Tache} from "../model/tache.model";
import {Collaborateur} from "../../Collaborateur/model/collaborateur.model";
import {Requette} from "../../Requette/model/requette.model";
import {CollaborateurService} from "../../Collaborateur/service/collaborateur.service";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-filter-tache',
  templateUrl: './filter-tache.component.html',
  styleUrls: ['./filter-tache.component.scss']
})
export class FilterTacheComponent implements OnInit {
  formGroup : FormGroup;
  @Input()
  taches : Observable<Array<Tache>>;
  tache : Array<Tache>;
  @Output()
  tacheChange : EventEmitter<any> = new EventEmitter<any>();
  collaborateur : Array<Collaborateur>;
  @Input()
  requette : Array<Requette>;
  statusTache = [
    {label: "NON_PLANIFIE", value: "NON_PLANIFIE"},
    {label: "PLANIFIE", value: "PLANIFIE"},
    {label: "EN_COURS", value: "EN_COURS"},
    {label: "A_VALIDER_ALPHA", value: "A_VALIDER_ALPHA"},
    {label: "A_VALIDER_BETA", value: "A_VALIDER_BETA"},
    {label: "TERMINE", value: "TERMINE"},
    {label: "DEPLOYE", value: "DEPLOYE"}
  ];
  clicked: boolean;

  constructor(
    private tacheService : TacheService,
    private collaborateurService : CollaborateurService,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.collaborateurService.getCollaborateur().subscribe({
      next: value => {
        this.collaborateur = value;
      },
      error: err => {
        console.log("Erreur liée à la recupération des des collaborateurs");
        throwError(err);
      }
    });
    this.taches.subscribe({
      next : value => {
        this.tache = value;
      },
      error: err => {
        console.log("Erreur lors de la récupération des taches.");
        throwError(err);
      }
    });

    this.formGroup = this.formBuilder.group({
      id:this.formBuilder.control(""),
      collaborateurId:this.formBuilder.control(""),
      requetteId:this.formBuilder.control(""),
      statusTache:this.formBuilder.control(""),
      dateDebut:this.formBuilder.control(""),
      dateFin:this.formBuilder.control(""),
      debutPrevisionel:this.formBuilder.control(""),
      finPrevisionel:this.formBuilder.control("")
    });
  }

  filterTaches(){
    let tache : Tache = this.formGroup.value;
    this.taches = this.tacheService.filterTaches(tache).pipe(catchError(err => {
      console.log("Erreur lors de la récupération des taches..");
      return throwError(err);
    }));

    this.taches.subscribe({
      next: value => {
       //console.log(value);
      },
      error: err => {
        console.log("Erreur lors de la récupération des taches..");
        throwError(err);
      }
    });

    this.tacheChange.emit(this.taches);
  }

}
