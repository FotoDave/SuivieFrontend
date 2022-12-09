import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConnexionComponent} from "./connexion/connexion.component";
import {Router, RouterModule, Routes} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "../app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {NgSelectModule} from "@ng-select/ng-select";
import {ChartsModule} from "ng2-charts";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../app.module";
import {AuthenticationRoutingModule} from "./authentication-routing.module";


@NgModule({
  declarations: [
    ConnexionComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    NgbModule,
    FormsModule,
    //BrowserModule,
    /*HttpClientModule,
    BrowserAnimationsModule,*/
    ToastrModule.forRoot({
      timeOut : 2000,
      progressBar : true,
      progressAnimation : 'increasing'
    }),
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    ChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class AuthenticationModule { }
