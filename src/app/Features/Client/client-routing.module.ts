import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {ClientsComponent} from "./clients/clients.component";
import {SaveClientComponent} from "./save-client/save-client.component";
import {EditClientComponent} from "./edit-client/edit-client.component";



@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'clients',
        component:ClientsComponent
      },

      {
        path: 'clients/creer',
        component:SaveClientComponent
      },

      {
        path: 'clients/modifier/:id',
        component:EditClientComponent
      },
    ])
  ],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
