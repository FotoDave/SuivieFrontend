import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {TachesComponent} from "./taches/taches.component";
import {ViewTacheComponent} from "./view-tache/view-tache.component";
import {AuthenticationGuard} from "../../Authentication/guards/authentication.guard";



@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        canActivate: [AuthenticationGuard],
        component:TachesComponent
      },
      {
        path: 'consulter/:id',
        canActivate: [AuthenticationGuard],
        component:ViewTacheComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class TacheRoutingModule { }
