import { HistorialLlamadasComponent } from '@administrador/historial_llamadas/historial_llamadas.component';
import { GrabacionesComponent } from '@administrador/grabaciones/grabaciones.component';
import { TrackingComponent } from '@administrador/tracking/tracking.component';
export var OperadorTemplateRoutes = [
    { path: 'Historial', component: HistorialLlamadasComponent },
    { path: 'Grabaciones', component: GrabacionesComponent },
    { path: 'Tracking', component: TrackingComponent },
    { path: '', redirectTo: 'Historial', pathMatch: 'full' }
];
