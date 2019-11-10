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
var accordion_1 = require("ngx-bootstrap/accordion");
var dropdown_1 = require("ngx-bootstrap/dropdown");
var http_1 = require("@angular/common/http");
// import { UserService } from '../../../../services/user.service';
var operador_template_routing_1 = require("./operador-template.routing");
var historial_llamadas_component_1 = require("@operador/historial_llamadas/historial_llamadas.component");
var tracking_component_1 = require("@operador/tracking/tracking.component");
var grabaciones_component_1 = require("@operador/grabaciones/grabaciones.component");
var audio_player_component_1 = require("@operador/grabaciones/audio_player/audio_player.component");
var tooltip_1 = require("ngx-bootstrap/tooltip");
var modal_1 = require("ngx-bootstrap/modal");
var datepicker_1 = require("ngx-bootstrap/datepicker");
var progressbar_1 = require("ngx-bootstrap/progressbar");
var OperadorTemplateModule = /** @class */ (function () {
    function OperadorTemplateModule() {
    }
    OperadorTemplateModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(operador_template_routing_1.OperadorTemplateRoutes),
                forms_1.FormsModule,
                http_1.HttpClientModule,
                forms_1.ReactiveFormsModule,
                accordion_1.AccordionModule,
                dropdown_1.BsDropdownModule,
                tooltip_1.TooltipModule.forRoot(),
                modal_1.ModalModule.forRoot(),
                datepicker_1.BsDatepickerModule.forRoot(),
                progressbar_1.ProgressbarModule.forRoot()
                // NgbModule
            ],
            declarations: [
                historial_llamadas_component_1.HistorialLlamadasComponent,
                tracking_component_1.TrackingComponent,
                grabaciones_component_1.GrabacionesComponent,
                audio_player_component_1.AudioPlayerComponent
            ]
        })
    ], OperadorTemplateModule);
    return OperadorTemplateModule;
}());
exports.OperadorTemplateModule = OperadorTemplateModule;
