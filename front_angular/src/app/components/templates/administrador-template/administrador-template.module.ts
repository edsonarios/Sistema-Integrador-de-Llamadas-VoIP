import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { HttpClientModule } from '@angular/common/http';


import { AdministradorTemplateRoutes } from './administrador-template.routing';

import { ContactosComponent } from '@administrador/contactos/contactos.component';
import { GrabacionesComponent } from '@administrador/grabaciones/grabaciones.component';
import { AudioPlayerComponent } from '@administrador/grabaciones/audio_player/audio_player.component'
import { HistorialLlamadasComponent } from '@administrador/historial_llamadas/historial_llamadas.component';
import { TrackingComponent } from '@administrador/tracking/tracking.component';
import { SalasComponent } from '@administrador/salas/salas.component'


//import { TooltipModule } from 'ngx-bootstrap/tooltip';
//import { ModalModule } from 'ngx-bootstrap/modal';
//import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(AdministradorTemplateRoutes),
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,

		//TooltipModule.forRoot(),
		//ModalModule.forRoot(),
		//BsDatepickerModule.forRoot(),
		ProgressbarModule.forRoot(),
		// NgbModule
	],
	declarations: [

		ContactosComponent,
		GrabacionesComponent,
		HistorialLlamadasComponent,
		TrackingComponent,
		SalasComponent,
		AudioPlayerComponent

	]
})
export class AdministradorTemplateModule {}
