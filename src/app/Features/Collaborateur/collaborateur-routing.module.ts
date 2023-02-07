import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {CollaborateursComponent} from "./collaborateurs/collaborateurs.component";
import {CreateCollaborateurComponent} from "./create-collaborateur/create-collaborateur.component";
import {EditCollaborateurComponent} from "./edit-collaborateur/edit-collaborateur.component";
import {AuthenticationGuard} from "../../Authentication/guards/authentication.guard";
import {AdminGuard} from "../../Guards/Admin/admin.guard";



@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        canActivate: [AuthenticationGuard],
        component:CollaborateursComponent
      },

      {
        path: 'creer',
        canActivate: [AuthenticationGuard],
        component:CreateCollaborateurComponent
      },

      {
        path: 'modifier/:id',
        canActivate: [AuthenticationGuard],
        component:EditCollaborateurComponent
      },
    ])
  ],
  exports: [RouterModule]
})
export class CollaborateurRoutingModule { }
