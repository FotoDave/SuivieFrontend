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
import {ViewRequetteComponent} from "./ComposantsMetier/Requette/view-requette/view-requette.component";
import {CreateRequetteComponent} from "./ComposantsMetier/Requette/create-requette/create-requette.component";
import {UpdateRequetteComponent} from "./ComposantsMetier/Requette/update-requette/update-requette.component";
import {ViewTacheComponent} from "./ComposantsMetier/Tache/view-tache/view-tache.component";



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
  { path: 'clients/creer', component:SaveClientComponent},
  { path: 'clients/modifier/:id', component:EditClientComponent},
  { path: 'collaborateurs', component:CollaborateursComponent},
  { path: 'collaborateurs/creer', component:CreateCollaborateurComponent},
  { path: 'collaborateurs/modifier/:id', component:EditCollaborateurComponent},
  { path: 'requettes', component:RequettesComponent},
  { path: 'requettes/creer', component:CreateRequetteComponent},
  { path: 'requettes/consulter/:id', component:ViewRequetteComponent},
  { path: 'requettes/modifier/:id', component:UpdateRequetteComponent},
  { path: 'taches', component:TachesComponent},
  { path: 'taches/consulter/:id', component:ViewTacheComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
