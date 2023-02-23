import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommentaireComponent} from "./Commentaire/commentaire/commentaire.component";
import {CreateTacheComponent} from "./create-tache/create-tache.component";
import {ModifierTacheComponent} from "./modifier-tache/modifier-tache.component";
import {PlanifierTacheComponent} from "./planifier-tache/planifier-tache.component";
import {TachesComponent} from "./taches/taches.component";
import {ViewTacheComponent} from "./view-tache/view-tache.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CoreModule} from "../../Core/core.module";
import {TacheRoutingModule} from "./tache-routing.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ChartsModule} from "ng2-charts";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../../app.module";
import {RouterModule} from "@angular/router";
import {ToastrModule} from "ngx-toastr";
import { FilterTacheComponent } from './filter-tache/filter-tache.component';



@NgModule({
  declarations: [
    CommentaireComponent,
    CreateTacheComponent,
    ModifierTacheComponent,
    PlanifierTacheComponent,
    TachesComponent,
    ViewTacheComponent,
    FilterTacheComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    TacheRoutingModule,
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
export class TacheModule { }
