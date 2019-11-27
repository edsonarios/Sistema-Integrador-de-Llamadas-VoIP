"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_component_1 = require("./components/pages/inicio/login/login.component");
// import { LoginComponent } from '@component/login.component';
var operador_template_component_1 = require("./components/templates/operador-template/operador-template.component");
exports.AppRoutes = [
    {
        path: 'Login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'Operador',
        component: operador_template_component_1.OperadorTemplateComponent,
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
