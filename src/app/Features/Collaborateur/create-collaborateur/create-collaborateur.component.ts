import { Component, OnInit } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {Collaborateur} from "../model/collaborateur.model";
import {CollaborateurService} from "../service/collaborateur.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-collaborateur',
  templateUrl: './create-collaborateur.component.html',
  styleUrls: ['./create-collaborateur.component.scss']
})
export class CreateCollaborateurComponent implements OnInit {
  collaborateur : Observable<Array<Collaborateur>>;
  saveFormGroup : FormGroup;
  clicked: boolean;
  constructor(
    private collabService : CollaborateurService,
    private saveFB : FormBuilder,
    private route : Router,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
    this.saveFormGroup = this.saveFB.group({
      nom : this.saveFB.control("")
    });
  }

  saveCollab() {
    let collab : Collaborateur = this.saveFormGroup.value;
    this.collabService.createCollab(collab).subscribe({
      next: value => {
        this.route.navigateByUrl("/collaborateurs");
        this.toastr.success("Création Collaborateur", "Succès");
      },
      error: err => {
        this.toastr.error("Problème d'accès au serveur","Erreur" );
        throwError(err);
      }
    })
  }
}
