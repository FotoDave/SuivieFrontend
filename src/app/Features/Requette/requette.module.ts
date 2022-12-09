import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContentComponent} from "./content/content.component";
import {CreateRequetteComponent} from "./create-requette/create-requette.component";
import {RequettesComponent} from "./requettes/requettes.component";
import {ViewRequetteComponent} from "./view-requette/view-requette.component";
import {UpdateRequetteComponent} from "./update-requette/update-requette.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "../../Core/core.module";
import {RequetteRoutingModule} from "./requette-routing.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TacheRoutingModule} from "../Tache/tache-routing.module";
import {RouterModule} from "@angular/router";
import {ChartsModule} from "ng2-charts";
import {ToastrModule} from "ngx-toastr";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../../app.module";



@NgModule({
  declarations: [
    ContentComponent,
    CreateRequetteComponent,
    RequettesComponent,
    ViewRequetteComponent,
    UpdateRequetteComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RequetteRoutingModule,
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
export class RequetteModule { }
