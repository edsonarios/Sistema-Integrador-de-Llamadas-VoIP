import { Routes } from '@angular/router';

import { ContactosComponent } from '../../pages/operador/contactos/contactos.component';
import { EditarContactosComponent } from '../../pages/operador/editar_contactos/editar_contactos.component';
import { AgregarContactosComponent } from '../../pages/operador/agregar_contactos/agregar_contactos.component';
import { HistorialLlamadasComponent } from '../../pages/operador/historial_llamadas/historial_llamadas.component';
import { TrackingComponent } from '../../pages/operador/tracking/tracking.component';
import { RolesComponent } from '../../pages/operador/roles/roles.component';
import { GrabacionesComponent } from '../../pages/operador/grabaciones/grabaciones.component';
import { CuentasComponent } from '../../pages/operador/cuentas/cuentas.component';

export const OperadorTemplateRoutes: Routes = [
  { path: 'Contactos', component: ContactosComponent },
  { path: 'Editar', component: EditarContactosComponent },
  { path: 'Agregar', component: AgregarContactosComponent }, //comentar en caso de usar 'agregar fuera'
  { path: 'Historial', component: HistorialLlamadasComponent },
  { path: 'Grabaciones', component: GrabacionesComponent },
  { path: 'Roles', component: RolesComponent },
  { path: 'Tracking', component: TrackingComponent },
  { path: 'Cuentas', component: CuentasComponent },
  { path: '', redirectTo: 'Contactos', pathMatch: 'full' }
];
