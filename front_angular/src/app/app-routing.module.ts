import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// import { PruebaComponent } from './components/pages/inicio/Pruebas_Llamada/prueba.component';
// import { Prueba2Component } from './components/pages/inicio/Prueba_Llamada2/prueba2.component';

import { LoginComponent } from './components/pages/inicio/login/login.component';
// import { LoginComponent } from '@component/login.component';
import { OperadorTemplateComponent } from './components/templates/operador-template/operador-template.component';
import { AdministradorTemplateComponent } from './components/templates/administrador-template/administrador-template.component';

export const AppRoutes: Routes = [
	{
		path: 'Login',
		component: LoginComponent
	},
	// {
	// 	path: 'Prueba',
	// 	component: PruebaComponent
	// },
	// {
	// 	path: 'Prueba2',
	// 	component: Prueba2Component
	// },
	{
		path: 'Operador',
		component: OperadorTemplateComponent,
		children: [
			{
				path: '',
				loadChildren:
					'./components/templates/operador-template/operador-template.module#OperadorTemplateModule'
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
					'./components/templates/administrador-template/administrador-template.module#AdministradorTemplateModule'
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
