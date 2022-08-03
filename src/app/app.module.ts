import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ContatosGuard } from './guards/contatos.guard';

import { AppComponent } from './app.component';
import { MenuPrincipalComponent } from './components/shared/menu-principal/menu-principal.component';
import { LoginComponent } from './components/pages/account/login/login.component';
import { RegisterComponent } from './components/pages/account/register/register.component';
import { PasswordComponent } from './components/pages/account/password/password.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ContatosCadastroComponent } from './components/pages/contatos/contatos-cadastro/contatos-cadastro.component';
import { ContatosConsultaComponent } from './components/pages/contatos/contatos-consulta/contatos-consulta.component';
import { ContatosEdicaoComponent } from './components/pages/contatos/contatos-edicao/contatos-edicao.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuPrincipalComponent,
    LoginComponent,
    RegisterComponent,
    PasswordComponent,
    ContatosCadastroComponent,
    ContatosConsultaComponent,
    ContatosEdicaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ContatosGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
