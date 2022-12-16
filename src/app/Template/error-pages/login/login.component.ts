import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {SecurityService} from "../../../Authentication/service/security.service";
import {AppUser} from "../../../Authentication/model/appUser.model";
import {TokenModel} from "../../../Authentication/model/token.model";
import {throwError} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup : FormGroup;
  appUser : AppUser;
  constructor(
    private formBuilder : FormBuilder,
    private securityService : SecurityService,
    private router : Router
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      username : this.formBuilder.control(""),
      password : this.formBuilder.control("")
    });
  }

  login(){
    //let user : AppUser = this.formGroup.value;
    console.log("Connexion de l'utilisateur")
    console.log(this.formGroup.value);
    /*this.securityService.authenticateUser(user.username, user.password).subscribe({
      next:value => {
        let jwt : TokenModel = value;
        localStorage.setItem('authUser', JSON.stringify({
          username : jwt.username,
          acces: jwt.acces_token,
          refresh : jwt.refresh_token}));
        this.securityService.getUser(jwt.acces_token).subscribe({
          next:value1 => {
            this.appUser = value1;
            console.log(value1);
            this.router.navigateByUrl("/taches");
          },
          error:err => {
            throwError("Erreur de récuparation de l'utilisateur");
          }
        })
      },
      error:err => {
        throwError("Mot de passe incorrect");
      }
    });*/
  }

}
