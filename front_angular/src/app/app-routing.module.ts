import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
{
   path: 'Login',
  component: LoginComponent,
},
{
   path: 'Dasboard',
  component: DashboardComponent,
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
