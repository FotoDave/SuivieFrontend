import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {TachesComponent} from "./taches/taches.component";
import {ViewTacheComponent} from "./view-tache/view-tache.component";



@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component:TachesComponent
      },
      {
        path: 'consulter/:id',
        component:ViewTacheComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class TacheRoutingModule { }
