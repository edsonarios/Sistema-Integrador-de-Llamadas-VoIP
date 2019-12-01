import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { HttpClientModule } from '@angular/common/http';


import { AdministradorTemplateRoutes } from './administrador-template.routing';

import { ContactosComponent } from '@administrador/contactos/contactos.component';
import { AgregarContactosComponent } from '@administrador/contactos/agregar_contacto/agregar_contacto.component';
import { EditarContactoComponent } from '@administrador/contactos/editar_contacto/editar_contacto.component';
import { DetalleContactoComponent } from '@administrador/contactos/detalle_contacto/detalle_contacto.component';
import { GrabacionesComponent } from '@administrador/grabaciones/grabaciones.component';
import { AudioPlayerComponent } from '@administrador/grabaciones/audio_player/audio_player.component'
import { HistorialLlamadasComponent } from '@administrador/historial_llamadas/historial_llamadas.component';
import { TrackingComponent } from '@administrador/tracking/tracking.component';
import { SalasComponent } from '@administrador/salas/salas.component'
import { AgregarSalaComponent } from '@administrador/salas/agregar_sala/agregar_sala.component';
import { AgregarNumeroComponent } from '@administrador/caller_number/agregar_numero/agregar_numero.component';
import { ContactoCardComponent } from '@administrador/contactos/contacto_card/contacto_card.component';

import { SipComponent } from '@administrador/caller_number/sip/sip.component';
import { IaxComponent } from '@administrador/caller_number/iax/iax.component';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(AdministradorTemplateRoutes),
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,

		TooltipModule.forRoot(),
		ModalModule.forRoot(),
		BsDatepickerModule.forRoot(),
		ProgressbarModule.forRoot(),
		// NgbModule
	],
	declarations: [

		ContactosComponent,
		GrabacionesComponent,
		HistorialLlamadasComponent,
		TrackingComponent,
		SalasComponent,
		AudioPlayerComponent,
		AgregarContactosComponent,
		EditarContactoComponent,
		AgregarSalaComponent,
		DetalleContactoComponent,
		AgregarNumeroComponent,
		ContactoCardComponent,
		SipComponent,
		IaxComponent

	],
	//entryComponents: [AgregarContactosComponent,EditarContactoComponent]
})
export class AdministradorTemplateModule {}
