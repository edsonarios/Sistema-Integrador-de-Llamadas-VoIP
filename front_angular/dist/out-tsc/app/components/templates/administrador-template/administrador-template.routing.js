"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contactos_component_1 = require("@administrador/contactos/contactos.component");
var grabaciones_component_1 = require("@administrador/grabaciones/grabaciones.component");
var historial_llamadas_component_1 = require("@administrador/historial_llamadas/historial_llamadas.component");
var tracking_component_1 = require("@administrador/tracking/tracking.component");
var salas_component_1 = require("@administrador/salas/salas.component");
exports.AdministradorTemplateRoutes = [
    { path: 'Contactos', component: contactos_component_1.ContactosComponent },
    { path: 'Historial', component: historial_llamadas_component_1.HistorialLlamadasComponent },
    { path: 'Grabaciones', component: grabaciones_component_1.GrabacionesComponent },
    { path: 'Tracking', component: tracking_component_1.TrackingComponent },
    { path: 'Salas', component: salas_component_1.SalasComponent },
    { path: '', redirectTo: 'Contactos', pathMatch: 'full' }
];
