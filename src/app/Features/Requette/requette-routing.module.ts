import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {RequettesComponent} from "./requettes/requettes.component";
import {CreateRequetteComponent} from "./create-requette/create-requette.component";
import {ViewRequetteComponent} from "./view-requette/view-requette.component";
import {UpdateRequetteComponent} from "./update-requette/update-requette.component";



@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component:RequettesComponent
      },

      {
        path: 'creer',
        component:CreateRequetteComponent
      },

      {
        path: 'consulter/:id',
        component:ViewRequetteComponent
      },

      {
        path: 'modifier/:id',
        component:UpdateRequetteComponent
      },
    ])
  ],
  exports: [RouterModule]
})
export class RequetteRoutingModule { }
