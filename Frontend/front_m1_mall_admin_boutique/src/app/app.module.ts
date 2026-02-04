import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './component/main/main.component';
import { HeaderComponent } from './component/header/header.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,      // Débloque <p-button>
    CheckboxModule,
    PaginatorModule, 
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
