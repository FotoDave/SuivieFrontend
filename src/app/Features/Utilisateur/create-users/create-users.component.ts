import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {UtilisateurService} from "../services/utilisateur.service";
import {User} from "../model/user.model";
import {throwError} from "rxjs";

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent implements OnInit {
  @Input()
  modal : any;
  formGroup : FormGroup;
  itemsRoles = [
    { value: "Admin", label: "Admin" },
    { value: "Client", label: "Client" },
    { value: "Collaborateur", label: "Collaborateur" },
  ];

  constructor(
    private modalService : NgbModal,
    private fb : FormBuilder,
    private toastr : ToastrService,
    private utilisateurService : UtilisateurService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      username:this.fb.control(""),
      password:this.fb.control(""),
      roleName:this.fb.control(""),
    });
  }

  createUser(){
    let user : User = this.formGroup.value;
    this.utilisateurService.createUser(user).subscribe({
      next:value => {
        this.toastr.success("Utilisateur crée", "Succès");
        this.modal.close();
      },
      error:err => {
        this.toastr.error("Problème d'accès au serveur","Erreur" );
        throwError(err);
      }
    })
  }
}
