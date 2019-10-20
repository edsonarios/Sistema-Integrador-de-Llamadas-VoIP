import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
{
   path: 'Login',
  component: LoginComponent,
},
  {
    path: 'Operador',
    loadChildren: () => import('./components/operador/operador.module')
      .then(m => m.OperadorModule),
  },


{
      path: '',
      redirectTo: 'Login',
      pathMatch: 'full',
    },
 {
      path: '**',
      redirectTo: 'Login',
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
