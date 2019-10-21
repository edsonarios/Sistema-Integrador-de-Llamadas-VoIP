import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { OperadorComponent } from './operador.component';
import { ContactosComponent } from './contactos/contactos.component';
import { AgregarContactosComponent } from './agregar_contactos/agregar_contactos.component';
import { EditarContactosComponent } from './editar_contactos/editar_contactos.component';
import { HistorialLlamadasComponent } from './historial_llamadas/historial_llamadas.component';

const routes: Routes = [{
  path: '',
  component: OperadorComponent,
  children: [
    {
      path: 'Contactos',
      component: ContactosComponent,
    },
    {
      path: 'Agregar',
      component: AgregarContactosComponent,
    },
    {
      path: 'Editar',
      component: EditarContactosComponent,
    },
    {
      path: 'Historial',
      component: HistorialLlamadasComponent,
    },
   /*  {
      path: '',
      redirectTo: 'Contactos',
      pathMatch: 'full',
    },
   {
      path: '**',
      component: NotFoundComponent,
    },*/
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperadorRoutingModule {
}
