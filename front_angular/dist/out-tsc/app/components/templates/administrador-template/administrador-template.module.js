"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var administrador_template_routing_1 = require("./administrador-template.routing");
var contactos_component_1 = require("@administrador/contactos/contactos.component");
var grabaciones_component_1 = require("@administrador/grabaciones/grabaciones.component");
var audio_player_component_1 = require("@administrador/grabaciones/audio_player/audio_player.component");
var historial_llamadas_component_1 = require("@administrador/historial_llamadas/historial_llamadas.component");
var tracking_component_1 = require("@administrador/tracking/tracking.component");
var salas_component_1 = require("@administrador/salas/salas.component");
var agregar_contacto_component_1 = require("@administrador/contactos/agregar_contacto/agregar_contacto.component");
var editar_contacto_component_1 = require("@administrador/contactos/editar_contacto/editar_contacto.component");
//import { TooltipModule } from 'ngx-bootstrap/tooltip';
var modal_1 = require("ngx-bootstrap/modal");
//import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
var progressbar_1 = require("ngx-bootstrap/progressbar");
var AdministradorTemplateModule = /** @class */ (function () {
    function AdministradorTemplateModule() {
    }
    AdministradorTemplateModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(administrador_template_routing_1.AdministradorTemplateRoutes),
                forms_1.FormsModule,
                http_1.HttpClientModule,
                forms_1.ReactiveFormsModule,
                //TooltipModule.forRoot(),
                modal_1.ModalModule.forRoot(),
                //BsDatepickerModule.forRoot(),
                progressbar_1.ProgressbarModule.forRoot(),
            ],
            declarations: [
                contactos_component_1.ContactosComponent,
                grabaciones_component_1.GrabacionesComponent,
                historial_llamadas_component_1.HistorialLlamadasComponent,
                tracking_component_1.TrackingComponent,
                salas_component_1.SalasComponent,
                audio_player_component_1.AudioPlayerComponent,
                agregar_contacto_component_1.AgregarContactosComponent,
                editar_contacto_component_1.EditarContactoComponent
            ],
            entryComponents: [agregar_contacto_component_1.AgregarContactosComponent, editar_contacto_component_1.EditarContactoComponent]
        })
    ], AdministradorTemplateModule);
    return AdministradorTemplateModule;
}());
exports.AdministradorTemplateModule = AdministradorTemplateModule;
