import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {UtilisateurService} from "../services/utilisateur.service";
import {User} from "../model/user.model";
import {throwError} from "rxjs";

@Component({
  selector: 'app-remove-role',
  templateUrl: './remove-role.component.html',
  styleUrls: ['./remove-role.component.scss']
})
export class RemoveRoleComponent implements OnInit {
  @Input()
  modal : any;
  formGroup : FormGroup;
  itemsRoles = [
    { value: "Admin", label: "Admin" },
    { value: "Client", label: "Client" },
    { value: "Collaborateur", label: "Collaborateur" },
  ];
  selectedId : number;
  @Input()
  user : User;

  constructor(
    private modalService : NgbModal,
    private fb : FormBuilder,
    private toastr : ToastrService,
    private utilisateurService : UtilisateurService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      username:this.fb.control(this.user.username),
      password:this.fb.control(this.user.password),
      roleName:this.fb.control(this.user.roleName),
    });
  }

  removeRole(){
    let appUser : User = this.formGroup.value;
    this.utilisateurService.removeRoleToUser(appUser).subscribe({
      next:() => {
        this.toastr.success("Utilisateur modifié", "Succès");
        this.modal.close();
      },
      error:err => {
        this.toastr.error("Problème d'accès au serveur","Réessayer");
        throwError(err);
      }
    })
  }
}
