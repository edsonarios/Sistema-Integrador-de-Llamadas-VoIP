import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { HttpClientModule } from '@angular/common/http';
// import { UserService } from '../../../../services/user.service';

import { OperadorTemplateRoutes } from './operador-template.routing';


import { HistorialLlamadasComponent } from '@administrador/historial_llamadas/historial_llamadas.component';
import { GrabacionesComponent } from '@administrador/grabaciones/grabaciones.component';
import { AudioPlayerComponent } from '@administrador/grabaciones/audio_player/audio_player.component'
import { TrackingComponent } from '@administrador/tracking/tracking.component';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

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
		ProgressbarModule.forRoot()

		//HistorialLlamadasComponent,
		// NgbModule
	],
	declarations: [
		HistorialLlamadasComponent,
		TrackingComponent,
		GrabacionesComponent,
		AudioPlayerComponent

	]
})
export class OperadorTemplateModule {}
