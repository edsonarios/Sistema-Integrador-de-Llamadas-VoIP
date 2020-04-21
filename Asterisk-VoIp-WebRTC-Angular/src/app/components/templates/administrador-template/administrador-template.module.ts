import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AdministradorTemplateRoutes } from './administrador-template.routing';

import { CuentaCardComponent } from '@administrador/cuentas/cuenta_card/cuenta_card.component';
import { CuentasComponent } from '@administrador/cuentas/cuentas.component';
import { AgregarCuentaComponent } from '@administrador/cuentas/agregar_cuenta/agregar_cuenta.component';
import { EditarCuentaComponent } from '@administrador/cuentas/editar_cuenta/editar_cuenta.component';
import { DetalleCuentaComponent } from '@administrador/cuentas/detalle_cuenta/detalle_cuenta.component';

import { SIP_IaxCardComponent } from '@administrador/sip_iax/sip_iax-card/sip_iax-card.component';
import { Sip_IaxComponent } from '@administrador/sip_iax/sip_iax.component';
import { SIP_IaxDetalleComponent } from '@administrador/sip_iax/detalle-sip_iax/detalle-sip_iax.component';
import { Agregar_Sip_IaxComponent } from '@administrador/sip_iax/agregar_sip-iax/agregar_sip-iax.component';
import { SipComponent } from '@administrador/caller_number/sip/sip.component';
import { IaxComponent } from '@administrador/caller_number/iax/iax.component';
import { AgregarNumeroComponent } from '@administrador/caller_number/agregar_numero/agregar_numero.component';

import { SalaCardComponent } from '@administrador/salas/sala_card/sala_card.component';
import { SalasComponent } from '@administrador/salas/salas.component'
import { AgregarSalaComponent } from '@administrador/salas/agregar_sala/agregar_sala.component';
import { DetalleSalaComponent } from '@administrador/salas/detalle_sala/detalle_sala.component';
import { EditarSalaComponent } from '@administrador/salas/editar_sala/editar_sala.component';

import { RadioCardComponent } from '@administrador/radios/radio_card/radio_card.component';
import { RadiosComponent } from '@administrador/radios/radios.component';
import { AgregarRadioComponent } from '@administrador/radios/agregar_radio/agregar_radio.component';

import { HistorialLlamadasComponent } from '@administrador/historial_llamadas/historial_llamadas.component';
import { AudioPlayerComponent } from '@administrador/grabaciones/audio_player/audio_player.component'
import { GrabacionesComponent } from '@administrador/grabaciones/grabaciones.component';
import { TrackingComponent } from '@administrador/tracking/tracking.component';


import { TabsModule } from 'ngx-bootstrap/tabs';
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
		TabsModule.forRoot(),
		// NgbModule
	],
	declarations: [
		CuentaCardComponent,
		CuentasComponent,
		AgregarCuentaComponent,
		EditarCuentaComponent,
		DetalleCuentaComponent,

		SIP_IaxCardComponent,
		Sip_IaxComponent,
		SIP_IaxDetalleComponent,
		SipComponent,
		IaxComponent,
		AgregarNumeroComponent,
		Agregar_Sip_IaxComponent,

		SalaCardComponent,
		SalasComponent,
		DetalleSalaComponent,
		AgregarSalaComponent,
		EditarSalaComponent,

		RadioCardComponent,
		RadiosComponent,
		AgregarRadioComponent,

		HistorialLlamadasComponent,
		GrabacionesComponent,
		AudioPlayerComponent,
		TrackingComponent
	],
	exports:  [ 
		HistorialLlamadasComponent, 
		GrabacionesComponent, 
		TrackingComponent
	]
	//entryComponents: [AgregarContactosComponent,EditarContactoComponent]
})
export class AdministradorTemplateModule {}
