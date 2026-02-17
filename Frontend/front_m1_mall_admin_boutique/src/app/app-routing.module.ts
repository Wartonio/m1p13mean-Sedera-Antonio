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
import { DashboardBoutiqueComponent } from './components/dashboard-boutique/dashboard-boutique.component';
import { ListecategoryproduitComponent } from './components/categoryproduit/listecategoryproduit/listecategoryproduit.component';
import { AddcategoryproduitComponent } from './components/categoryproduit/addcategoryproduit/addcategoryproduit.component';
import { ListproduitComponent } from './components/product/listproduit/listproduit.component';
import { AddproduitComponent } from './components/product/addproduit/addproduit.component';
import { StockproduitComponent } from './components/product/stockproduit/stockproduit.component';
import { AddStockproduitComponent } from './components/product/add-stockproduit/add-stockproduit.component';
import { ListecommandeComponent } from './components/commande/listecommande/listecommande.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard-admin', component: DashboardAdminComponent },
  { path: 'dashboard-boutique', component: DashboardBoutiqueComponent },
  { path: 'user-list', component: ListesComponent },
  { path: 'user-add', component: AjoutsComponent },
  { path: 'user-edit/:id', component: ModifsComponent },
  { path: 'role-list', component: ListesRComponent },
  { path: 'role-add', component: AjoutsRComponent },
  { path: 'cat-list', component: LsitCComponent },
  { path: 'catproduct-list', component: ListecategoryproduitComponent },
  { path: 'addstock', component: AddStockproduitComponent },
  { path: 'Listproduct', component: ListproduitComponent },
  { path: 'stock', component: StockproduitComponent },
  { path: 'commande', component: ListecommandeComponent },
  { path: 'cat-add', component: AddCComponent },
  { path: 'addproduct', component: AddproduitComponent },
  { path: 'cat-edit/:id', component: EditCComponent },
  { path: 'shop-list', component: ListSComponent },
  { path: 'addcatprod', component: AddcategoryproduitComponent },
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
