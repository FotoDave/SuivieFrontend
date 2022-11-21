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
import { NavbarComponent } from './ComposantTemplate/shared/navbar/navbar.component';
import { SidebarComponent } from './ComposantTemplate/shared/sidebar/sidebar.component';
import { SettingsPanelComponent } from './ComposantTemplate/shared/settings-panel/settings-panel.component';
import { FooterComponent } from './ComposantTemplate/shared/footer/footer.component';
import { SpinnerComponent } from './ComposantTemplate/shared/spinner/spinner.component';
import { ContentAnimateDirective } from './ComposantTemplate/shared/directives/content-animate.directive';
import { ClientsComponent } from './ComposantsMetier/Client/clients/clients.component';
import { CollaborateursComponent } from './ComposantsMetier/Collaborateur/collaborateurs/collaborateurs.component';
import { RequettesComponent } from './ComposantsMetier/Requette/requettes/requettes.component';
import { TachesComponent } from './ComposantsMetier/Tache/taches/taches.component';
//import {timeout} from "rxjs/operators";
import { SaveClientComponent } from './ComposantsMetier/Client/save-client/save-client.component';
import { EditClientComponent } from './ComposantsMetier/Client/edit-client/edit-client.component';
import {CreateCollaborateurComponent} from "./ComposantsMetier/Collaborateur/create-collaborateur/create-collaborateur.component";
import {EditCollaborateurComponent} from "./ComposantsMetier/Collaborateur/edit-collaborateur/edit-collaborateur.component";
import { ViewRequetteComponent } from './ComposantsMetier/Requette/view-requette/view-requette.component';
import { CreateRequetteComponent } from './ComposantsMetier/Requette/create-requette/create-requette.component';
import { UpdateRequetteComponent } from './ComposantsMetier/Requette/update-requette/update-requette.component';
import { ContentComponent } from './ComposantsMetier/Requette/content/content.component';
import { CreateTacheComponent } from './ComposantsMetier/Tache/create-tache/create-tache.component';
import { ViewTacheComponent } from './ComposantsMetier/Tache/view-tache/view-tache.component';
import { CommentaireComponent } from './ComposantsMetier/Commentaire/commentaire/commentaire.component';
import { ModifierTacheComponent } from './ComposantsMetier/Tache/modifier-tache/modifier-tache.component';
import { PlanifierTacheComponent } from './ComposantsMetier/Tache/planifier-tache/planifier-tache.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    SettingsPanelComponent,
    FooterComponent,
    SpinnerComponent,
    ContentAnimateDirective,
    ClientsComponent,
    CollaborateursComponent,
    RequettesComponent,
    TachesComponent,
    SaveClientComponent,
    EditClientComponent,
    CreateCollaborateurComponent,
    EditCollaborateurComponent,
    ViewRequetteComponent,
    CreateRequetteComponent,
    UpdateRequetteComponent,
    ContentComponent,
    CreateTacheComponent,
    ViewTacheComponent,
    CommentaireComponent,
    ModifierTacheComponent,
    PlanifierTacheComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
