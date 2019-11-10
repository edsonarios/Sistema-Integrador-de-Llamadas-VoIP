import { Routes } from '@angular/router';

import { ContactosComponent } from '../../pages/administrador/contactos/contactos.component';

export const AdministradorTemplateRoutes: Routes = [
  { path: 'Contactos', component: ContactosComponent },
  { path: '', redirectTo: 'Contactos', pathMatch: 'full' }
];
