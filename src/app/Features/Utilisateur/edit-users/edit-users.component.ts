import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {UtilisateurService} from "../services/utilisateur.service";
import {User} from "../model/user.model";
import {throwError} from "rxjs";
import {AppUser} from "../../../Authentication/model/appUser.model";

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {
  @Input()
  modal : any;
  formGroup : FormGroup;
  itemsRoles = [
    { value: "Admin", label: "Admin" },
    { value: "Client", label: "Client" },
    { value: "Collaborateur", label: "Collaborateur" },
  ];
  @Input()
  user : AppUser;
  @Output()
  actualisation : EventEmitter<any> = new EventEmitter<any>();
  clicked: boolean;

  constructor(
    private modalService : NgbModal,
    private fb : FormBuilder,
    private toastr : ToastrService,
    private utilisateurService : UtilisateurService
  ) { }

  ngOnInit(): void {
    this.user.roleName = this.user.roles.shift();
    console.log(this.user);
    this.formGroup = this.fb.group({
      username:this.fb.control(this.user.username),
      roleName:this.fb.control(this.user.roleName),
    });
  }

  editUser(){
    let appUser : AppUser = this.formGroup.value;
    appUser.id = this.user.id;
    appUser.roles = new Array<string>();
    appUser.roles.push(appUser.roleName);
    console.log(appUser);
    this.utilisateurService.editUser(appUser).subscribe({
      next:() => {
        this.actualisation.emit()
        this.toastr.success("Utilisateur modifié", "Succès");
        this.modal.close();
      },
      error:err => {
        this.toastr.error("Problème d'accès au serveur","Réessayer");
        throwError(err);
      }
    });
  }
}
