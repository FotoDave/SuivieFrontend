import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {UtilisateursComponent} from "./utilisateurs/utilisateurs.component";



@NgModule({
  declarations: [

  ],

  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: UtilisateursComponent
      }
    ])
  ],

  exports: [RouterModule]
})
export class UtilisateurRoutingModule { }
