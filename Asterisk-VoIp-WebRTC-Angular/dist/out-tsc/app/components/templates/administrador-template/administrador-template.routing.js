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
import { RadiosComponent } from '@administrador/radios/radios.component';
import { AgregarRadioComponent } from '@administrador/radios/agregar_radio/agregar_radio.component';
export var AdministradorTemplateRoutes = [
    { path: 'Contactos', component: ContactosComponent },
    { path: 'AgregarContacto', component: AgregarContactosComponent },
    { path: 'AgregarContacto/:id', component: AgregarContactosComponent },
    { path: 'EditarContacto', component: EditarContactoComponent },
    { path: 'EditarContacto/:id', component: EditarContactoComponent },
    { path: 'DetalleContacto', component: DetalleContactoComponent },
    { path: 'DetalleContacto/:id', component: DetalleContactoComponent },
    { path: 'Historial', component: HistorialLlamadasComponent },
    { path: 'Grabaciones', component: GrabacionesComponent },
    { path: 'Tracking', component: TrackingComponent },
    { path: 'Salas', component: SalasComponent },
    { path: 'AgregarSala', component: AgregarSalaComponent },
    { path: 'AgregarNumero', component: AgregarNumeroComponent },
    { path: 'Radios', component: RadiosComponent },
    { path: 'AgregarRadio', component: AgregarRadioComponent },
    { path: '', redirectTo: 'Contactos', pathMatch: 'full' }
];
