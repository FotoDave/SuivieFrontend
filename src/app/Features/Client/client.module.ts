import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientsComponent} from "./clients/clients.component";
import {EditClientComponent} from "./edit-client/edit-client.component";
import {SaveClientComponent} from "./save-client/save-client.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "../../Core/core.module";
import {ClientRoutingModule} from "./client-routing.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {RouterModule} from "@angular/router";
import {ChartsModule} from "ng2-charts";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../../app.module";



@NgModule({
  declarations: [
    ClientsComponent,
    EditClientComponent,
    SaveClientComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ClientRoutingModule,
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
export class ClientModule { }
