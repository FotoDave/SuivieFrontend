import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {UtilisateurService} from "../services/utilisateur.service";
import {User} from "../model/user.model";
import {throwError} from "rxjs";
import {AppUser} from "../../../Authentication/model/appUser.model";
import {ClientsService} from "../../Client/services/clients.service";
import {Client} from "../../Client/model/client.model";

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent implements OnInit {
  @Input()
  modal : any;
  formGroup : FormGroup;
  client : Array<Client>
  itemsRoles = [
    { value: "Admin", label: "Admin" },
    { value: "Client", label: "Client" },
    { value: "Collaborateur", label: "Collaborateur" },
  ];
  @Output()
  actualisation : EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private modalService : NgbModal,
    private fb : FormBuilder,
    private toastr : ToastrService,
    private utilisateurService : UtilisateurService,
    private clientService : ClientsService
  ) { }

  ngOnInit(): void {
    this.clientService.getClient().subscribe({
      next: value => {
        this.client = value;
      },
      error: err => {
        console.log("Erreur lors de la récupération de la liste des clients");
        throwError(err);
      }
    });

    this.formGroup = this.fb.group({
      username : this.fb.control(""),
      password : this.fb.control(""),
      roleName : this.fb.control(""),
      clientId : this.fb.control("")
    });
  }

  createUser(){
    let user : AppUser = this.formGroup.value;
    user.roles = new Array<string>();
    user.roles.push(user.roleName);
    this.utilisateurService.createUser(user).subscribe({
      next:() => {
        this.actualisation.emit();
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
