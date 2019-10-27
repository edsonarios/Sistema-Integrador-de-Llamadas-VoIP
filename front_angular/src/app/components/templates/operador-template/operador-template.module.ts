import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { HttpClientModule } from '@angular/common/http';
//import { UserService } from '../../../../services/user.service';

import { OperadorTemplateRoutes } from './operador-template.routing';

import { ContactosComponent } from '../../pages/operador/contactos/contactos.component';
import { HistorialLlamadasComponent } from '../../pages/operador/historial_llamadas/historial_llamadas.component';
import { TrackingComponent } from '../../pages/operador/tracking/tracking.component';
import { RolesComponent } from '../../pages/operador/roles/roles.component';
import { GrabacionesComponent } from '../../pages/operador/grabaciones/grabaciones.component';
import { CuentasComponent } from '../../pages/operador/cuentas/cuentas.component';

import { TooltipModule } from 'ngx-bootstrap/tooltip';


//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(OperadorTemplateRoutes),
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AccordionModule,
    BsDropdownModule,
    TooltipModule.forRoot()
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
