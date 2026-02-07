import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { ListesComponent } from './components/utilisateurs/listes/listes.component';
import { AjoutsComponent } from './components/utilisateurs/ajouts/ajouts.component';
import { ModifsComponent } from './components/utilisateurs/modifs/modifs.component';
import { ListesRComponent } from './components/roles/listes-r/listes-r.component';
import { AjoutsRComponent } from './components/roles/ajouts-r/ajouts-r.component';
import { AddCComponent } from './components/cat-shop/add-c/add-c.component';
import { LsitCComponent } from './components/cat-shop/lsit-c/lsit-c.component';
import { EditCComponent } from './components/cat-shop/edit-c/edit-c.component';
import { AddSComponent } from './components/shop/add-s/add-s.component';
import { ListSComponent } from './components/shop/list-s/list-s.component';
import { EditSComponent } from './components/shop/edit-s/edit-s.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard-admin', component: DashboardAdminComponent },
  { path: 'user-list', component: ListesComponent },
  { path: 'user-add', component: AjoutsComponent },
  { path: 'user-edit/:id', component: ModifsComponent },
  { path: 'role-list', component: ListesRComponent },
  { path: 'role-add', component: AjoutsRComponent },
  { path: 'cat-list', component: LsitCComponent },
  { path: 'cat-add', component: AddCComponent },
  { path: 'cat-edit/:id', component: EditCComponent },
  { path: 'shop-list', component: ListSComponent },
  { path: 'shop-add', component: AddSComponent },
  { path: 'shop-edit/:id', component: EditSComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
