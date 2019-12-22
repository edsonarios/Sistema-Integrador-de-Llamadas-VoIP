"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contactos_component_1 = require("@administrador/contactos/contactos.component");
var agregar_contacto_component_1 = require("@administrador/contactos/agregar_contacto/agregar_contacto.component");
var editar_contacto_component_1 = require("@administrador/contactos/editar_contacto/editar_contacto.component");
var detalle_contacto_component_1 = require("@administrador/contactos/detalle_contacto/detalle_contacto.component");
var agregar_numero_component_1 = require("@administrador/caller_number/agregar_numero/agregar_numero.component");
var grabaciones_component_1 = require("@administrador/grabaciones/grabaciones.component");
var historial_llamadas_component_1 = require("@administrador/historial_llamadas/historial_llamadas.component");
var tracking_component_1 = require("@administrador/tracking/tracking.component");
var salas_component_1 = require("@administrador/salas/salas.component");
var agregar_sala_component_1 = require("@administrador/salas/agregar_sala/agregar_sala.component");
exports.AdministradorTemplateRoutes = [
    { path: 'Contactos', component: contactos_component_1.ContactosComponent },
    { path: 'AgregarContacto', component: agregar_contacto_component_1.AgregarContactosComponent },
    { path: 'AgregarContacto/:id', component: agregar_contacto_component_1.AgregarContactosComponent },
    { path: 'EditarContacto', component: editar_contacto_component_1.EditarContactoComponent },
    { path: 'EditarContacto/:id', component: editar_contacto_component_1.EditarContactoComponent },
    { path: 'DetalleContacto', component: detalle_contacto_component_1.DetalleContactoComponent },
    { path: 'DetalleContacto/:id', component: detalle_contacto_component_1.DetalleContactoComponent },
    { path: 'Historial', component: historial_llamadas_component_1.HistorialLlamadasComponent },
    { path: 'Grabaciones', component: grabaciones_component_1.GrabacionesComponent },
    { path: 'Tracking', component: tracking_component_1.TrackingComponent },
    { path: 'Salas', component: salas_component_1.SalasComponent },
    { path: 'AgregarSala', component: agregar_sala_component_1.AgregarSalaComponent },
    { path: 'AgregarNumero', component: agregar_numero_component_1.AgregarNumeroComponent },
    { path: '', redirectTo: 'Contactos', pathMatch: 'full' }
];
