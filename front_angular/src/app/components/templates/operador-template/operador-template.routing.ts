import { Routes } from '@angular/router';

import { HistorialLlamadasComponent } from '@administrador/historial_llamadas/historial_llamadas.component';
import { GrabacionesComponent } from '@administrador/grabaciones/grabaciones.component';
import { TrackingComponent } from '@administrador/tracking/tracking.component';
export const OperadorTemplateRoutes: Routes = [
  { path: 'Historial', component: HistorialLlamadasComponent },
  { path: 'Grabaciones', component: GrabacionesComponent },
  { path: 'Tracking', component: TrackingComponent },
  { path: '', redirectTo: 'Historial', pathMatch: 'full' }
];
