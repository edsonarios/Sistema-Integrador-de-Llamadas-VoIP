import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { HttpClientModule } from '@angular/common/http';
// import { UserService } from '../../../../services/user.service';

import { OperadorTemplateRoutes } from './operador-template.routing';

import { ContactosComponent } from '@operador/contactos/contactos.component';
import { HistorialLlamadasComponent } from '@operador/historial_llamadas/historial_llamadas.component';
import { TrackingComponent } from '@operador/tracking/tracking.component';
import { RolesComponent } from '@operador/roles/roles.component';
import { GrabacionesComponent } from '@operador/grabaciones/grabaciones.component';
import { CuentasComponent } from '@operador/cuentas/cuentas.component';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(OperadorTemplateRoutes),
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
		AccordionModule,
		BsDropdownModule,
		TooltipModule.forRoot(),
		ModalModule.forRoot()
		// NgbModule
	],
	declarations: [
		ContactosComponent,
		HistorialLlamadasComponent,
		TrackingComponent,
		RolesComponent,
		GrabacionesComponent,
		CuentasComponent
	]
})
export class OperadorTemplateModule {}
