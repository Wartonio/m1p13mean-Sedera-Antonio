import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { ListesComponent } from './components/utilisateurs/listes/listes.component';
import { AjoutsComponent } from './components/utilisateurs/ajouts/ajouts.component';
import { ModifsComponent } from './components/utilisateurs/modifs/modifs.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard-admin', component: DashboardAdminComponent },
  { path: 'user-list', component: ListesComponent },
  { path: 'user-add', component: AjoutsComponent },
  { path: 'user-edit', component: ModifsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
