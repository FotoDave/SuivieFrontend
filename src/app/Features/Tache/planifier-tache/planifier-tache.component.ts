import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tache} from "../model/tache.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TacheService} from "../service/tache.service";
import {Collaborateur} from "../../Collaborateur/model/collaborateur.model";
import {CollaborateurService} from "../../Collaborateur/service/collaborateur.service";
import {throwError} from "rxjs";
import {ToastrService} from "ngx-toastr";

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
  @Output()
  actualisation : EventEmitter<any> = new EventEmitter<any>();
  formGroup : FormGroup;
  collaborateurs : Array<Collaborateur>
  constructor(
    private tacheService : TacheService,
    private collaborateurService : CollaborateurService,
    private formBuilder : FormBuilder,
    private toastr : ToastrService
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
      debutPrevisionel : this.formBuilder.control(""),
      finPrevisionel : this.formBuilder.control("")
    })
  }

  planifier(){
    this.tache = this.formGroup.value;
    this.tache.id = this.idTache
    this.tacheService.planifierTache(this.tache).subscribe({
      next: value => {
        this.actualisation.emit();
        this.modal.close();
      },
      error: err => {
        this.toastr.error("Problème d'accès au serveur","Erreur" );
        throwError(err);
      }
    })
  }
}
