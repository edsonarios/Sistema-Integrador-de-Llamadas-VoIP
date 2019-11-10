import { Routes } from '@angular/router';

import { HistorialLlamadasComponent } from '../../pages/operador/historial_llamadas/historial_llamadas.component';
import { TrackingComponent } from '../../pages/operador/tracking/tracking.component';
import { GrabacionesComponent } from '../../pages/operador/grabaciones/grabaciones.component';

export const OperadorTemplateRoutes: Routes = [
  { path: 'Historial', component: HistorialLlamadasComponent },
  { path: 'Grabaciones', component: GrabacionesComponent },
  { path: 'Tracking', component: TrackingComponent },
  { path: '', redirectTo: 'Historial', pathMatch: 'full' }
];
