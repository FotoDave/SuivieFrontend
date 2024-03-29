import { Component, OnInit } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {User} from "../model/user.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UtilisateurService} from "../services/utilisateur.service";
import {ToastrService} from "ngx-toastr";
import {catchError} from "rxjs/operators";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AppUser} from "../../../Authentication/model/appUser.model";

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent implements OnInit {
  users : Observable<Array<AppUser>>;
  user : AppUser;
  searchFormGroup : FormGroup
  constructor(
    private fb : FormBuilder,
    private utilisateurService : UtilisateurService,
    private toastr : ToastrService,
    private modalService : NgbModal
  ) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control("")
    });

    this.users = this.utilisateurService.listUsers().pipe(
      catchError(err => {
        console.log("Problème lié à la recupération des utilisateurs");
        return throwError(err);
      }));
  }

  searchUsers(){

  }

  openCreate(create) {
    this.modalService.open(create, { size: 'xl' });
  }

  openUpdate(update, appUser:AppUser) {
    console.log(appUser)
    this.user = appUser;
    this.modalService.open(update, { size: 'xl' });
  }

  openRemove(remove, appUser:AppUser) {
    this.user = appUser;
    this.modalService.open(remove, { size: 'xl' });
  }

  actualiser(){
    this.users = this.utilisateurService.listUsers().pipe(
      catchError(err => {
        console.log("Problème lié à la recupération des utilisateurs");
        return throwError(err);
      }));
  }
}
