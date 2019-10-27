import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutes } from './app-routing.module';

import { AppComponent } from './app.component';
import { OperadorTemplateComponent } from './components/templates/operador-template/operador-template.component';
import { LoginComponent } from './components/pages/inicio/login/login.component';
//Modal Components
import { DialPadComponent } from './components/pages/operador/dialpad/dialpad.component';
import { AgregarContactosComponent } from './components/pages/operador/agregar_contactos/agregar_contactos.component';
import { EditarContactosComponent } from './components/pages/operador/editar_contactos/editar_contactos.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DialPadComponent,
    AgregarContactosComponent,
    EditarContactosComponent,
    OperadorTemplateComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(AppRoutes,{
    useHash: true
    }),
    AngularFontAwesomeModule,
    FontAwesomeModule,
    AccordionModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
  entryComponents: [DialPadComponent,AgregarContactosComponent,EditarContactosComponent]
})
export class AppModule { }
