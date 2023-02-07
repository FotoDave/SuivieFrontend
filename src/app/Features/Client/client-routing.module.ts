import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {ClientsComponent} from "./clients/clients.component";
import {SaveClientComponent} from "./save-client/save-client.component";
import {EditClientComponent} from "./edit-client/edit-client.component";
import {AuthenticationGuard} from "../../Authentication/guards/authentication.guard";
import {AdminGuard} from "../../Guards/Admin/admin.guard";



@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        canActivate: [AuthenticationGuard],
        component:ClientsComponent
      },

      {
        path: 'creer',
        canActivate: [AuthenticationGuard],
        component:SaveClientComponent
      },

      {
        path: 'modifier/:id',
        canActivate: [AuthenticationGuard],
        component:EditClientComponent
      },
    ])
  ],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
