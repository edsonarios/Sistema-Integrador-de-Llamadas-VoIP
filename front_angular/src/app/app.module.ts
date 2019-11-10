import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutes } from './app-routing.module';

import { AppComponent } from './app.component';

import { LoginComponent } from './components/pages/inicio/login/login.component';


//fontawesome
import { AngularFontAwesomeModule } from 'angular-font-awesome';
// Templates
import { OperadorTemplateComponent } from './components/templates/operador-template/operador-template.component';
import { AdministradorTemplateComponent } from './components/templates/administrador-template/administrador-template.component';


// Modal Components
import { DialPadComponent } from './components/pages/operador/dialpad/dialpad.component';


import { AgendaComponent } from '@operador/agenda/agenda.component';
import { NotificacionComponent } from '@operador/notificacion/notificacion.component';
import { SalaComponent } from '@operador/sala/sala.component';

import { LlamadaComponent } from '@operador/llamada/llamada.component';



import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		DialPadComponent,
		OperadorTemplateComponent,
		AdministradorTemplateComponent,
		AgendaComponent,
		NotificacionComponent,
		SalaComponent,
		LlamadaComponent
		
	],
	imports: [
		AngularFontAwesomeModule,
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule,
		BrowserModule,
		RouterModule.forRoot(AppRoutes, {
			useHash: false
		}),
		AccordionModule,
		TooltipModule.forRoot(),
		BsDropdownModule.forRoot(),
		ModalModule.forRoot(),
		TabsModule.forRoot(),
		PopoverModule.forRoot(),
		BrowserAnimationsModule
	],
	providers: [UserService],
	bootstrap: [AppComponent],
	entryComponents: [DialPadComponent]
})
export class AppModule {}
