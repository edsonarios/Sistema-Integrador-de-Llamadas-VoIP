import { LoginComponent } from './components/pages/inicio/login/login.component';
import { OperadorTemplateComponent } from './components/templates/operador-template/operador-template.component';
import { AdministradorTemplateComponent } from './components/templates/administrador-template//administrador-template.component';
export var AppRoutes = [
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
                loadChildren: './components/templates/operador-template/operador-template.module#OperadorTemplateModule'
            }
        ]
    },
    {
        path: 'Administrador',
        component: AdministradorTemplateComponent,
        children: [
            {
                path: '',
                loadChildren: './components/templates/administrador-template/administrador-template.module#AdministradorTemplateModule'
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
