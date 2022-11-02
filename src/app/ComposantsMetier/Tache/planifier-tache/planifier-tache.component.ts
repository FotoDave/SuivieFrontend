import {Component, Input, OnInit} from '@angular/core';
import {Tache} from "../model/tache.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TacheService} from "../service/tache.service";
import {Collaborateur} from "../../Collaborateur/model/collaborateur.model";
import {CollaborateurService} from "../../Collaborateur/service/collaborateur.service";
import {throwError} from "rxjs";

@Component({
  selector: 'app-planifier-tache',
  templateUrl: './planifier-tache.component.html',
  styleUrls: ['./planifier-tache.component.scss']
})
export class PlanifierTacheComponent implements OnInit {
  tache : Tache;
  @Input()
  modal : any;
  @Input()
  idTache : number;
  formGroup : FormGroup;
  collaborateurs : Array<Collaborateur>
  constructor(
    private tacheService : TacheService,
    private collaborateurService : CollaborateurService,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.collaborateurService.getCollaborateur().subscribe({
      next: value =>{
        this.collaborateurs = value;
      },
      error: err => {
        throwError(err);
      }
    });

    this.formGroup = this.formBuilder.group({
      collaborateurId : this.formBuilder.control(""),
      debut_previsionel : this.formBuilder.control(""),
      fin_previsionel : this.formBuilder.control("")
    })
  }

  planifier(){
    this.tache = this.formGroup.value;
    this.tache.id = this.idTache
    this.tacheService.planifierTache(this.tache).subscribe({
      next: value => {
        this.modal.close();
      },
      error: err => {
        throwError(err);
      }
    })
  }
}
