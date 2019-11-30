"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var login_component_1 = require("./components/pages/inicio/login/login.component");
//fontawesome
var angular_font_awesome_1 = require("angular-font-awesome");
// Templates
var operador_template_component_1 = require("./components/templates/operador-template/operador-template.component");
var administrador_template_component_1 = require("./components/templates/administrador-template/administrador-template.component");
// Modal Components
var dialpad_component_1 = require("./components/pages/operador/dialpad/dialpad.component");
var agenda_component_1 = require("@operador/agenda/agenda.component");
var notificacion_component_1 = require("@operador/notificacion/notificacion.component");
var sala_component_1 = require("@operador/sala/sala.component");
var panel_component_1 = require("@operador/panel/panel.component");
var llamada_component_1 = require("@operador/llamada/llamada.component");
var accordion_1 = require("ngx-bootstrap/accordion");
var dropdown_1 = require("ngx-bootstrap/dropdown");
var tooltip_1 = require("ngx-bootstrap/tooltip");
var modal_1 = require("ngx-bootstrap/modal");
var tabs_1 = require("ngx-bootstrap/tabs");
var popover_1 = require("ngx-bootstrap/popover");
var http_1 = require("@angular/common/http");
var user_service_1 = require("../services/user.service");
var forms_2 = require("@angular/forms");
var animations_1 = require("@angular/platform-browser/animations");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                dialpad_component_1.DialPadComponent,
                operador_template_component_1.OperadorTemplateComponent,
                administrador_template_component_1.AdministradorTemplateComponent,
                agenda_component_1.AgendaComponent,
                notificacion_component_1.NotificacionComponent,
                sala_component_1.SalaComponent,
                llamada_component_1.LlamadaComponent,
                panel_component_1.PanelComponent
            ],
            imports: [
                angular_font_awesome_1.AngularFontAwesomeModule,
                forms_1.ReactiveFormsModule,
                forms_2.FormsModule,
                http_1.HttpClientModule,
                platform_browser_1.BrowserModule,
                router_1.RouterModule.forRoot(app_routing_module_1.AppRoutes, {
                    useHash: false
                }),
                accordion_1.AccordionModule,
                tooltip_1.TooltipModule.forRoot(),
                dropdown_1.BsDropdownModule.forRoot(),
                modal_1.ModalModule.forRoot(),
                tabs_1.TabsModule.forRoot(),
                popover_1.PopoverModule.forRoot(),
                animations_1.BrowserAnimationsModule
            ],
            providers: [user_service_1.UserService],
            bootstrap: [app_component_1.AppComponent],
            entryComponents: [dialpad_component_1.DialPadComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
