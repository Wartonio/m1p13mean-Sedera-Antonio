import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './component/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { TopbarComponent } from './component/topbar/topbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { ShopComponent } from './components/shop/shop.component';
import { FloatingCartComponent } from './component/floating-cart/floating-cart.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShopDetailsComponent } from './components/shop-details/shop-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    MainComponent,
    LoginComponent,
    HomeComponent,
    ProductComponent,
    ShopComponent,
    FloatingCartComponent,
    ProductDetailsComponent,
    ShopDetailsComponent,
    CartDetailsComponent
  ],
  imports: [
    DragDropModule,
    BrowserModule,
    AppRoutingModule,
    ButtonModule,      // Débloque <p-button>
    CheckboxModule,
    PaginatorModule, 
    InputTextModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
