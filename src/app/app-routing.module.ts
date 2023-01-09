import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CoreComponent} from "./Core/core/core.component";
import {ConnexionComponent} from "./Authentication/connexion/connexion.component";
import {AuthenticationGuard} from "./Authentication/guards/authentication.guard";
import {AdminGuard} from "./Guards/Admin/admin.guard";
import {CollaborateurGuard} from "./Guards/Collaborateur/collaborateur.guard";



const routes: Routes = [
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: () => import('./Template/dashboard/dashboard.module').then(m => m.DashboardModule) },
  //{ path: 'basic-ui', loadChildren: () => import('./basic-ui/basic-ui.module').then(m => m.BasicUiModule) },
  //{ path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsDemoModule) },
  //{ path: 'forms', loadChildren: () => import('./forms/form.module').then(m => m.FormModule) },
  //{ path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  //{ path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  //{ path: 'user-pages', loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule) },
  //{ path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },

  {
    path: '',
    component : ConnexionComponent,
    loadChildren: () => import('./Authentication/authentication.module').then(m => m.AuthenticationModule)
  },

  {
    path: 'clients',
    component : CoreComponent,
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./Features/Client/client.module').then(m => m.ClientModule)
  },

  {
    path: 'collaborateurs',
    component : CoreComponent,
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./Features/Collaborateur/collaborateur.module').then(m => m.CollaborateurModule)
  },

  {
    path: 'requettes',
    component : CoreComponent,
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./Features/Requette/requette.module').then(m => m.RequetteModule)
  },

  {
    path: 'taches',
    component : CoreComponent,
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./Features/Tache/tache.module').then(m => m.TacheModule)
  },

  {
    path: 'utilisateurs',
    component : CoreComponent,
    canActivate: [AuthenticationGuard],
    loadChildren : () => import('./Features/Utilisateur/utilisateur.module').then(m => m.UtilisateurModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
