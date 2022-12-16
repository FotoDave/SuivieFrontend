import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {CollaborateursComponent} from "./collaborateurs/collaborateurs.component";
import {CreateCollaborateurComponent} from "./create-collaborateur/create-collaborateur.component";
import {EditCollaborateurComponent} from "./edit-collaborateur/edit-collaborateur.component";



@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component:CollaborateursComponent
      },

      {
        path: 'creer',
        component:CreateCollaborateurComponent
      },

      {
        path: 'modifier/:id',
        component:EditCollaborateurComponent
      },
    ])
  ],
  exports: [RouterModule]
})
export class CollaborateurRoutingModule { }
