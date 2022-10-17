import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable, throwError} from "rxjs";
import {Collaborateur} from "../model/collaborateur.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CollaborateurService} from "../service/collaborateur.service";

@Component({
  selector: 'app-edit-collaborateur',
  templateUrl: './edit-collaborateur.component.html',
  styleUrls: ['./edit-collaborateur.component.scss']
})
export class EditCollaborateurComponent implements OnInit {
  editFormGroup : FormGroup;
  collaborateur : Observable<Array<Collaborateur>>;
  idCollab : number;
  constructor(
    private route : Router,
    private collabService : CollaborateurService,
    private activatedRoute : ActivatedRoute,
    private editFB : FormBuilder
  ) { }

  ngOnInit(): void {
    this.idCollab = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.collabService.getOneCollaborateur(this.idCollab).subscribe({
      next: value => {
        this.editFormGroup = this.editFB.group({
          nom : this.editFB.control(value.nom)
        })
      },
      error: err => {
        throwError(err);
      }
    })
  }

  updateCollab() {
    let collab:Collaborateur = this.editFormGroup.value;
    this.collabService.updateCollab(collab,this.idCollab).subscribe({
      next: value => {
        this.route.navigateByUrl("/collaborateurs");
      },
      error: err => {
        throwError(err);
      }
    })
  }
}
