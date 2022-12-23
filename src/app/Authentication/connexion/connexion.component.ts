import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {SecurityService} from "../service/security.service";
import {AppUser} from "../model/appUser.model";
import {TokenModel} from "../model/token.model";
import {Router} from "@angular/router";
import { throwError } from 'rxjs';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  appUser : AppUser;
  errorMessage : string;
  jwt : TokenModel;
  formGroup : FormGroup;
  constructor(
    private formBuilder : FormBuilder,
    private securityService : SecurityService,
    private router : Router,
    private toast : ToastrService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      username : this.formBuilder.control(""),
      password : this.formBuilder.control("")
    });
  }

  login(){
    console.log("Connexion de l'utilisateur")
    let user : AppUser = this.formGroup.value;
    console.log(user);
    this.securityService.authenticateUser(user.username, user.password).subscribe({
      next:value => {
        if(value){
          console.log("Token récupéré");
          this.jwt = value;
          console.log(this.jwt)
          this.securityService.storeTokens(this.jwt);
          this.router.navigateByUrl("/taches");
        }
      },
      error:err => {
        this.errorMessage = "Utilisateur inexistant ou mot de passe incorrect !"
        //this.toast.error('Mot de passe incorrect','Erreur');
        throwError(err);
      }
    });
  }
}
