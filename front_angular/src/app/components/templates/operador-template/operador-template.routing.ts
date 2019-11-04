import { Routes } from '@angular/router';

import { ContactosComponent } from '@operador/contactos/contactos.component';
import { HistorialLlamadasComponent } from '@operador/historial_llamadas/historial_llamadas.component';
import { GrabacionesComponent } from '@operador/grabaciones/grabaciones.component';
import { RolesComponent } from '@operador/roles/roles.component';
import { TrackingComponent } from '@operador/tracking/tracking.component';
import { CuentasComponent } from '@operador/cuentas/cuentas.component';

export const OperadorTemplateRoutes: Routes = [
	{ path: 'contactos', component: ContactosComponent },
	{ path: 'historial', component: HistorialLlamadasComponent },
	{ path: 'grabaciones', component: GrabacionesComponent },
	{ path: 'roles', component: RolesComponent },
	{ path: 'tracking', component: TrackingComponent },
	{ path: 'cuentas', component: CuentasComponent },
	{ path: '', redirectTo: 'contactos', pathMatch: 'full' }
];
