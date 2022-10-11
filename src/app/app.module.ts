import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastrModule} from "ngx-toastr";

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SettingsPanelComponent } from './shared/settings-panel/settings-panel.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { ClientsComponent } from './clients/clients.component';
import { CollaborateursComponent } from './collaborateurs/collaborateurs.component';
import { RequettesComponent } from './requettes/requettes.component';
import { TachesComponent } from './taches/taches.component';
import { NewClientComponent } from './new-client/new-client.component';
import {timeout} from "rxjs/operators";

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
    NewClientComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    ToastrModule.forRoot({
      timeOut : 1500,
      progressBar : true,
      progressAnimation : "increasing"
      }
    ),
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
