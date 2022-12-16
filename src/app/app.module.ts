import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import {NgSelectModule} from "@ng-select/ng-select";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from "ngx-toastr";
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContentAnimateDirective } from './Template/shared/directives/content-animate.directive';
import {CoreModule} from "./Core/core.module";
import {AuthenticationModule} from "./Authentication/authentication.module";
import {CollaborateurModule} from "./Features/Collaborateur/collaborateur.module";
import {RequetteModule} from "./Features/Requette/requette.module";
import {TacheModule} from "./Features/Tache/tache.module";
import {RouterModule} from "@angular/router";
import {TokenInterceptorProvider} from "./Authentication/inteceptors/token.interceptor";
import {ErrorInterceptorProvider} from "./Authentication/inteceptors/error.interceptor";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

@NgModule({
  declarations: [
    AppComponent,
    ContentAnimateDirective,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,

    CoreModule
  ],

  providers: [
    TokenInterceptorProvider,
    ErrorInterceptorProvider
  ],

  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
