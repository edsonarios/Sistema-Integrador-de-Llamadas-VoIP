import { Routes } from '@angular/router';

import { ContactosComponent } from '@administrador/contactos/contactos.component';
import { AgregarContactosComponent } from '@administrador/contactos/agregar_contacto/agregar_contacto.component';
import { EditarContactoComponent } from '@administrador/contactos/editar_contacto/editar_contacto.component';
import { DetalleContactoComponent } from '@administrador/contactos/detalle_contacto/detalle_contacto.component';
import { AgregarNumeroComponent } from '@administrador/caller_number/agregar_numero/agregar_numero.component';
import { GrabacionesComponent } from '@administrador/grabaciones/grabaciones.component';
import { HistorialLlamadasComponent } from '@administrador/historial_llamadas/historial_llamadas.component';
import { TrackingComponent } from '@administrador/tracking/tracking.component';
import { SalasComponent } from '@administrador/salas/salas.component';
import { AgregarSalaComponent } from '@administrador/salas/agregar_sala/agregar_sala.component';

export const AdministradorTemplateRoutes: Routes = [
  { path: 'Contactos', component: ContactosComponent },
  { path: 'AgregarContacto', component: AgregarContactosComponent },
  { path: 'EditarContacto', component: EditarContactoComponent },
  { path: 'DetalleContacto', component: DetalleContactoComponent },
  { path: 'Historial', component: HistorialLlamadasComponent },
  { path: 'Grabaciones', component: GrabacionesComponent },
  { path: 'Tracking', component: TrackingComponent },
  { path: 'Salas', component: SalasComponent },
  { path: 'AgregarSala', component: AgregarSalaComponent },
  { path: 'AgregarNumero', component: AgregarNumeroComponent },
  { path: '', redirectTo: 'Contactos', pathMatch: 'full' }
];
