import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {UtilisateursComponent} from "./utilisateurs/utilisateurs.component";
import {AuthenticationGuard} from "../../Authentication/guards/authentication.guard";
import {AdminGuard} from "../../Guards/Admin/admin.guard";



@NgModule({
  declarations: [

  ],

  imports: [
    RouterModule.forChild([
      {
        path: '',
        canActivate: [AuthenticationGuard],
        component: UtilisateursComponent
      }
    ])
  ],

  exports: [RouterModule]
})
export class UtilisateurRoutingModule { }
