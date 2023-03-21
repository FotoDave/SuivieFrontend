import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TacheService} from "../service/tache.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Tache} from "../model/tache.model";
import {throwError} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-modifier-tache',
  templateUrl: './modifier-tache.component.html',
  styleUrls: ['./modifier-tache.component.scss']
})
export class ModifierTacheComponent implements OnInit {
  @Input()
  modal : any;
  formGroup : FormGroup;
  @Input()
  idTache : number;
  @Output()
  actualisation : EventEmitter<any> = new EventEmitter<any>();
  tache : Tache;
  clicked: boolean;
  constructor(
    private tacheService : TacheService,
    private formBuilder : FormBuilder,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
    this.tacheService.getOneTache(this.idTache).subscribe({
      next:value => {
        this.formGroup = this.formBuilder.group({
          intitule : this.formBuilder.control(value.intitule),
          observation : this.formBuilder.control(value.observation)
        })
      },
      error:err => {
        throwError(err);
      }
    })
  }

  modifier(){
    this.tache = this.formGroup.value;
    this.tache.id = this.idTache;
    this.tacheService.modifierTache(this.tache).subscribe({
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
