import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable, throwError} from "rxjs";
import {Collaborateur} from "../model/collaborateur.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CollaborateurService} from "../service/collaborateur.service";
import {ToastrModule, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-collaborateur',
  templateUrl: './edit-collaborateur.component.html',
  styleUrls: ['./edit-collaborateur.component.scss']
})
export class EditCollaborateurComponent implements OnInit {
  formGroup : FormGroup;
  collaborateurs : Observable<Collaborateur>;
  idCollab : String;
  constructor(
    private route : Router,
    private collabService : CollaborateurService,
    private activatedRoute : ActivatedRoute,
    private formBuilder : FormBuilder,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
    this.idCollab = this.activatedRoute.snapshot.paramMap.get('id');
    this.collabService.getOneCollaborateur(Number(this.idCollab)).subscribe({
      next: value => {
        this.formGroup = this.formBuilder.group(
          {
            nom : this.formBuilder.control(value.nom)
          }
        );
      },
      error: err => {
        throwError(err);
      }
    })
  }

  updateCollab() {
    let collab:Collaborateur = this.formGroup.value;
    collab.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.collabService.createCollab(collab).subscribe({
      next: value => {
        this.toastr.success("Modification du Collaborateur", "Succès");
        this.route.navigateByUrl("/collaborateurs");
      },
      error: err => {
        this.toastr.error("Problème d'accès au serveur","Erreur" );
        throwError(err);
      }
    })
  }
}
