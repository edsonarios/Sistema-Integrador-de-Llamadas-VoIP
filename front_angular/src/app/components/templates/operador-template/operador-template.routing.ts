import { Routes } from '@angular/router';

import { ContactosComponent } from '../../pages/operador/contactos/contactos.component';
import { HistorialLlamadasComponent } from '../../pages/operador/historial_llamadas/historial_llamadas.component';
import { TrackingComponent } from '../../pages/operador/tracking/tracking.component';
import { RolesComponent } from '../../pages/operador/roles/roles.component';
import { GrabacionesComponent } from '../../pages/operador/grabaciones/grabaciones.component';
import { CuentasComponent } from '../../pages/operador/cuentas/cuentas.component';

export const OperadorTemplateRoutes: Routes = [
  { path: 'Contactos', component: ContactosComponent },
  { path: 'Historial', component: HistorialLlamadasComponent },
  { path: 'Grabaciones', component: GrabacionesComponent },
  { path: 'Roles', component: RolesComponent },
  { path: 'Tracking', component: TrackingComponent },
  { path: 'Cuentas', component: CuentasComponent },
  { path: '', redirectTo: 'Contactos', pathMatch: 'full' }
];
