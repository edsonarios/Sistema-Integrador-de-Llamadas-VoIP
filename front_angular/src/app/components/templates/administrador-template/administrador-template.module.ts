import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { HttpClientModule } from '@angular/common/http';


import { AdministradorTemplateRoutes } from './administrador-template.routing';

import { ContactosComponent } from '@administrador/contactos/contactos.component';




//import { TooltipModule } from 'ngx-bootstrap/tooltip';
//import { ModalModule } from 'ngx-bootstrap/modal';
//import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

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

		// NgbModule
	],
	declarations: [

		ContactosComponent,

	]
})
export class AdministradorTemplateModule {}
