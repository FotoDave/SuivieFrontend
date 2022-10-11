import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientsComponent} from './clients/clients.component';
import {CollaborateursComponent} from './collaborateurs/collaborateurs.component';
import {RequettesComponent} from './requettes/requettes.component';
import {TachesComponent} from './taches/taches.component';
import {NewClientComponent} from "./new-client/new-client.component";



const routes: Routes = [
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //{ path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  //{ path: 'basic-ui', loadChildren: () => import('./basic-ui/basic-ui.module').then(m => m.BasicUiModule) },
  //{ path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsDemoModule) },
  //{ path: 'forms', loadChildren: () => import('./forms/form.module').then(m => m.FormModule) },
  //{ path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  //{ path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  //{ path: 'user-pages', loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule) },
  //{ path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
  { path: 'clients', component:ClientsComponent},
  { path: 'new-client', component:NewClientComponent},
  { path: 'collaborateurs', component:CollaborateursComponent},
  { path: 'requettes', component:RequettesComponent},
  { path: 'taches', component:TachesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
