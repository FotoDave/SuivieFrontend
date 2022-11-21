import { Component, OnInit } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {Collaborateur} from "../model/collaborateur.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CollaborateurService} from "../service/collaborateur.service";
import {Router} from "@angular/router";
import {catchError, map} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-collaborateurs',
  templateUrl: './collaborateurs.component.html',
  styleUrls: ['./collaborateurs.component.scss']
})
export class CollaborateursComponent implements OnInit {
  collaborateur : Observable<Array<Collaborateur>>;
  searchFormGroup : FormGroup;

  constructor(
    private collabService : CollaborateurService,
    private searchFb : FormBuilder,
    private route : Router,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
    this.searchFormGroup = this.searchFb.group({
      keyword : this.searchFb.control("")
    });

    this.collaborateur = this.collabService.getCollaborateur().pipe(
      catchError(err => {
        return throwError("Erreur de connexion avec le serveur");
      })
    );
  }

  searchCollab() {
    let mot = this.searchFormGroup.value.keyword;
    this.collaborateur = this.collabService.searchCollaborateur(mot).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  infoCollab(id: number) {
    this.route.navigateByUrl("collaborateurs/modifier/"+id);
  }

  deleteCollab(c: Collaborateur) {
    this.collabService.deleteCollaborateur(c.id).subscribe({
      next : value => {
        this.collaborateur = this.collaborateur.pipe(
          map(data => {
            let index = data.indexOf(c);
            data.slice(index,1);
            return data;
          })
        );
        this.toastr.success("Suppression Collaborateur", "Succès");
      },
      error : err => {
        this.toastr.error("Problème d'accès au serveur","Erreur" );
        console.log(err);
      }
    });
  }
}
