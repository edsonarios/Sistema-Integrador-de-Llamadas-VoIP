import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { LoginComponent } from './components/pages/inicio/login/login.component';
// import { LoginComponent } from '@component/login.component';
import { OperadorTemplateComponent } from './components/templates/operador-template/operador-template.component';
import { AdministradorTemplateComponent } from './components/templates/administrador-template/administrador-template.component';

export const AppRoutes: Routes = [
	{
		path: 'Login',
		component: LoginComponent
	},
	{
		path: 'Operador',
		component: OperadorTemplateComponent,
		children: [
			{
				path: '',
				loadChildren:
					() => import('./components/templates/operador-template/operador-template.module').then(m => m.OperadorTemplateModule)
			}
		]
	},
	{
		path: 'Administrador',
		component: AdministradorTemplateComponent,
		children: [
			{
				path: '',
				loadChildren:
					() => import('./components/templates/administrador-template/administrador-template.module').then(m => m.AdministradorTemplateModule)
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
