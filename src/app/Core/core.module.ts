import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreComponent} from "./core/core.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {NgSelectModule} from "@ng-select/ng-select";
import {ChartsModule} from "ng2-charts";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AppModule, HttpLoaderFactory} from "../app.module";
import {BrowserModule} from "@angular/platform-browser";
import {FooterComponent} from "../Template/shared/footer/footer.component";
import {SpinnerComponent} from "../Template/shared/spinner/spinner.component";
import {SidebarComponent} from "../Template/shared/sidebar/sidebar.component";
import {SettingsPanelComponent} from "../Template/shared/settings-panel/settings-panel.component";
import {NavbarComponent} from "../Template/shared/navbar/navbar.component";
import {RouterLinkActive, RouterModule, RouterOutlet} from "@angular/router";



@NgModule({
  declarations: [
    CoreComponent,
    FooterComponent,
    NavbarComponent,
    SpinnerComponent,
    SidebarComponent,
    SettingsPanelComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
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
    })
  ]
})
export class CoreModule { }
