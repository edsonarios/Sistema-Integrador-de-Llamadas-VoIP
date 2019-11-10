import { Routes } from '@angular/router';

import { ContactosComponent } from '@administrador/contactos/contactos.component';
import { GrabacionesComponent } from '@administrador/grabaciones/grabaciones.component';
import { HistorialLlamadasComponent } from '@administrador/historial_llamadas/historial_llamadas.component';
import { TrackingComponent } from '@administrador/tracking/tracking.component';
import { SalasComponent } from '@administrador/salas/salas.component'

export const AdministradorTemplateRoutes: Routes = [
  { path: 'Contactos', component: ContactosComponent },
  { path: 'Historial', component: HistorialLlamadasComponent },
  { path: 'Grabaciones', component: GrabacionesComponent },
  { path: 'Tracking', component: TrackingComponent },
    { path: 'Salas', component: SalasComponent },
  { path: '', redirectTo: 'Contactos', pathMatch: 'full' }
];
