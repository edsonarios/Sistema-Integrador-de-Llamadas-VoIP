import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { LoginComponent } from './components/pages/inicio/login/login.component';
// import { LoginComponent } from '@component/login.component';
import { OperadorTemplateComponent } from './components/templates/operador-template/operador-template.component';
// import { AgregarContactosComponent } from './components/pages/operador/agregar_contactos/agregar_contactos.component'; //quitar si se quiere usar fuera

export const AppRoutes: Routes = [
	{
		path: 'Login',
		component: LoginComponent
	},
	/*{
  path: 'Agregar',
  component: AgregarContactosComponent,
},*/
	{
		path: 'Operador',
		component: OperadorTemplateComponent,
		children: [
			{
				path: '',
				loadChildren: './components/templates/operador-template/operador-template.module#OperadorTemplateModule'
			}
		]
	},
	{
		path: '',
		redirectTo: 'Login',
		pathMatch: 'full'
	},
	{
		path: '**',
		redirectTo: 'Login'
	}
];
