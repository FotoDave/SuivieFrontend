import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TacheService} from "../service/tache.service";
import {RequetteService} from "../../Requette/service/requette.service";
import {Requette} from "../../Requette/model/requette.model";
import {throwError} from "rxjs";
import {Tache} from "../model/tache.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-tache',
  templateUrl: './create-tache.component.html',
  styleUrls: ['./create-tache.component.scss']
})
export class CreateTacheComponent implements OnInit {
  @Input()
  modal : any;
  formGroup : FormGroup;
  requettes : Array<Requette>;
  items = [];

  constructor(
    private formBuilder : FormBuilder,
    private tacheService : TacheService,
    private requetteService : RequetteService,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {

    this.requetteService.getRequttes().subscribe({
      next: value => {
        this.requettes = value;
      },
      error: err =>{
        throwError(err);
      }
    });

    this.formGroup = this.formBuilder.group({
      requetteId : this.formBuilder.control(""),
      intitule : this.formBuilder.control(""),
      observation : this.formBuilder.control("")
    })
  }

  creerTache(){
    let tache: Tache = this.formGroup.value;
    this.tacheService.creerTache(tache).subscribe({
      next : value => {
        this.toastr.success("Création Tâche", "Succès");
        this.modal.close();
      },
      error : err => {
        this.toastr.error("Problème d'accès au serveur","Erreur" );
        throwError(err);
      }
    })
  }
}
