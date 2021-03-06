import { Routes } from '@angular/router';

import { CuentasComponent } from '@administrador/cuentas/cuentas.component';
import { AgregarCuentaComponent } from '@administrador/cuentas/agregar_cuenta/agregar_cuenta.component';
import { EditarCuentaComponent } from '@administrador/cuentas/editar_cuenta/editar_cuenta.component';
import { DetalleCuentaComponent } from '@administrador/cuentas/detalle_cuenta/detalle_cuenta.component';


import { SIP_IaxDetalleComponent } from '@administrador/sip_iax/detalle-sip_iax/detalle-sip_iax.component';
import { Sip_IaxComponent } from '@administrador/sip_iax/sip_iax.component';
import { Agregar_Sip_IaxComponent } from '@administrador/sip_iax/agregar_sip-iax/agregar_sip-iax.component';

import { SalasComponent } from '@administrador/salas/salas.component';
import { AgregarSalaComponent } from '@administrador/salas/agregar_sala/agregar_sala.component';
import { DetalleSalaComponent } from '@administrador/salas/detalle_sala/detalle_sala.component';
import { EditarSalaComponent } from '@administrador/salas/editar_sala/editar_sala.component';

import { RadiosComponent } from '@administrador/radios/radios.component';
import { AgregarRadioComponent } from '@administrador/radios/agregar_radio/agregar_radio.component';
import { DetalleRadioComponent } from '@administrador/radios/detalle_radio/detalle_radio.component';
import { EditarRadioComponent } from '@administrador/radios/editar_radio/editar_radio.component';

import { ExtensionIvrComponent } from '@administrador/extension_ivr/extension_ivr.component';
import { ExtensionIvrAgregarComponent } from '@administrador/extension_ivr/agregar_extension_ivr/agregar_extension_ivr.component';
import { ExtensionIvrEditarComponent } from '@administrador/extension_ivr/editar_extension_ivr/editar_extension_ivr.component';

import { HistorialLlamadasComponent } from '@administrador/historial_llamadas/historial_llamadas.component';
import { GrabacionesComponent } from '@administrador/grabaciones/grabaciones.component';
import { TrackingComponent } from '@administrador/tracking/tracking.component';



export const AdministradorTemplateRoutes: Routes = [
  { path: 'Cuentas', component: CuentasComponent },
  { path: 'AgregarCuenta', component: AgregarCuentaComponent },
  { path: 'EditarCuenta', component: EditarCuentaComponent },
  { path: 'DetalleCuenta', component: DetalleCuentaComponent },

  { path: 'SIP_IAX', component: Sip_IaxComponent },
  { path: 'DetalleSIP_IAX', component: SIP_IaxDetalleComponent },
  { path: 'AgregarSipIax', component: Agregar_Sip_IaxComponent },

  { path: 'Salas', component: SalasComponent },
  { path: 'DetalleSala', component: DetalleSalaComponent},
  { path: 'EditarSala', component: EditarSalaComponent},
  { path: 'AgregarSala', component: AgregarSalaComponent },

  { path: 'Radios', component: RadiosComponent },
  { path: 'AgregarRadio', component: AgregarRadioComponent },
  { path: 'DetalleRadio', component: DetalleRadioComponent },
  { path: 'EditarRadio', component: EditarRadioComponent },
  

  { path: 'ExtensionIvr', component: ExtensionIvrComponent },
  { path: 'AgregarExtensionIvr', component: ExtensionIvrAgregarComponent },
  { path: 'EditarExtensionIvr', component: ExtensionIvrEditarComponent },

  { path: 'Historial', component: HistorialLlamadasComponent },
  { path: 'Grabaciones', component: GrabacionesComponent },
  { path: 'Tracking', component: TrackingComponent },
  { path: '', redirectTo: 'Cuentas', pathMatch: 'full' }
];
