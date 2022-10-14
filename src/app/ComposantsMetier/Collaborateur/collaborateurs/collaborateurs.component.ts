import { Component, OnInit } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {Collaborateur} from "../model/collaborateur.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CollaborateurService} from "../service/collaborateur.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";

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
    private route : Router
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

  }

  infoCollab(id: number) {

  }

  deleteCollab(c: Collaborateur) {

  }
}
