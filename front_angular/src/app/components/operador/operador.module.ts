import { NgModule } from '@angular/core';
import { DashboardComp } from '../@dashboard/dashboard.component';
import { OperadorComponent } from './operador.component';
import { OperadorRoutingModule } from './operador-routing.module';

import { ContactosComponent } from './contactos/contactos.component';
import { AgregarContactosComponent } from './agregar_contactos/agregar_contactos.component';
import { EditarContactosComponent } from './editar_contactos/editar_contactos.component';

import { HistorialLlamadasComponent } from './historial_llamadas/historial_llamadas.component';
/*import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
*/
@NgModule({
  imports: [
    OperadorRoutingModule,
  ],
  declarations: [
    OperadorComponent,
     DashboardComp,
     ContactosComponent,
    // AgregarContactosComponent,
     EditarContactosComponent,
     HistorialLlamadasComponent
  ],
})
export class OperadorModule {
}
