import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import {UtilisateurRoutingModule} from "./utilisateur-routing.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {RouterModule} from "@angular/router";
import {ChartsModule} from "ng2-charts";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../../app.module";
import {CoreModule} from "../../Core/core.module";
import { RemoveRoleComponent } from './remove-role/remove-role.component';



@NgModule({

  declarations: [
    UtilisateursComponent,
    CreateUsersComponent,
    EditUsersComponent,
    RemoveRoleComponent
  ],

  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    UtilisateurRoutingModule,
    NgSelectModule,
    RouterModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    //Module Template
    CoreModule
  ]
})
export class UtilisateurModule { }
