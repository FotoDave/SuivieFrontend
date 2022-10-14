import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientsComponent} from './ComposantsMetier/Client/clients/clients.component';
import {CollaborateursComponent} from './ComposantsMetier/Collaborateur/collaborateurs/collaborateurs.component';
import {RequettesComponent} from './ComposantsMetier/Requette/requettes/requettes.component';
import {TachesComponent} from './ComposantsMetier/Tache/taches/taches.component';
import {SaveClientComponent} from "./ComposantsMetier/Client/save-client/save-client.component";
import {EditClientComponent} from "./ComposantsMetier/Client/edit-client/edit-client.component";
import {
  CreateCollaborateurComponent
} from "./ComposantsMetier/Collaborateur/create-collaborateur/create-collaborateur.component";
import {
  EditCollaborateurComponent
} from "./ComposantsMetier/Collaborateur/edit-collaborateur/edit-collaborateur.component";



const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: () => import('./ComposantTemplate/dashboard/dashboard.module').then(m => m.DashboardModule) },
  //{ path: 'basic-ui', loadChildren: () => import('./basic-ui/basic-ui.module').then(m => m.BasicUiModule) },
  //{ path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsDemoModule) },
  //{ path: 'forms', loadChildren: () => import('./forms/form.module').then(m => m.FormModule) },
  //{ path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  //{ path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  //{ path: 'user-pages', loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule) },
  //{ path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
  { path: 'clients', component:ClientsComponent},
  { path: 'collaborateurs', component:CollaborateursComponent},
  { path: 'requettes', component:RequettesComponent},
  { path: 'taches', component:TachesComponent},
  { path: 'clients/creer', component:SaveClientComponent},
  { path: 'clients/modifier/:id', component:EditClientComponent},
  { path: 'collaborateurs/creer', component:CreateCollaborateurComponent},
  { path: 'collaborateurs/modifier/:id', component:EditCollaborateurComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
