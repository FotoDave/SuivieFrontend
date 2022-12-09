import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {ConnexionComponent} from "./connexion/connexion.component";



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path:'',
        component:ConnexionComponent
      },

      {
        path:'login',
        component:ConnexionComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
