import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { HttpClientModule } from '@angular/common/http';
// import { UserService } from '../../../../services/user.service';

import { OperadorTemplateRoutes } from './operador-template.routing';

import { HistorialLlamadasComponent } from '@operador/historial_llamadas/historial_llamadas.component';
import { TrackingComponent } from '@operador/tracking/tracking.component';
import { GrabacionesComponent } from '@operador/grabaciones/grabaciones.component';



import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


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
		ModalModule.forRoot(),
		BsDatepickerModule.forRoot(),

		// NgbModule
	],
	declarations: [

		HistorialLlamadasComponent,
		TrackingComponent,
		GrabacionesComponent,

	]
})
export class OperadorTemplateModule {}
