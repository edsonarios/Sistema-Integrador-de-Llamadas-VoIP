"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var historial_llamadas_component_1 = require("../../pages/operador/historial_llamadas/historial_llamadas.component");
var tracking_component_1 = require("../../pages/operador/tracking/tracking.component");
var grabaciones_component_1 = require("../../pages/operador/grabaciones/grabaciones.component");
exports.OperadorTemplateRoutes = [
    { path: 'Historial', component: historial_llamadas_component_1.HistorialLlamadasComponent },
    { path: 'Grabaciones', component: grabaciones_component_1.GrabacionesComponent },
    { path: 'Tracking', component: tracking_component_1.TrackingComponent },
    { path: '', redirectTo: 'Contactos', pathMatch: 'full' }
];
