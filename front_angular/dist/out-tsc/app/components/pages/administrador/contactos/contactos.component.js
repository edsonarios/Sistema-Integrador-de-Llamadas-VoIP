"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var modal_1 = require("ngx-bootstrap/modal");
var user_service_1 = require("@services/user.service");
var agregar_contacto_component_1 = require("./agregar_contacto/agregar_contacto.component");
var ContactosComponent = /** @class */ (function () {
    function ContactosComponent(router, modalService, userservice) {
        this.router = router;
        this.modalService = modalService;
        this.userservice = userservice;
        this.Contactos = [
            { 'Nombre': 'Daniel', 'Estado': 'Conectado', 'Numero': '3001' },
            { 'Nombre': 'Juan', 'Estado': 'Desconectado', 'Numero': '3001' },
            { 'Nombre': 'Marco', 'Estado': 'Conectado', 'Numero': '3001' },
            { 'Nombre': 'Mario', 'Estado': 'Desconectado', 'Numero': '3002' },
            { 'Nombre': 'Alonso', 'Estado': 'Conectado', 'Numero': '3001' },
            { 'Nombre': 'Edgar', 'Estado': 'Desconectado', 'Numero': '3001' },
            { 'Nombre': 'Daniel', 'Estado': 'Conectado', 'Numero': '3001' },
            { 'Nombre': 'Ramiro', 'Estado': 'Desconectado', 'Numero': '3002' },
            { 'Nombre': 'Daniel', 'Estado': 'Conectado', 'Numero': '3001' },
            { 'Nombre': 'Manuel', 'Estado': 'Desconectado', 'Numero': '3001' },
            { 'Nombre': 'Daniel', 'Estado': 'Conectado', 'Numero': '3001' },
            { 'Nombre': 'Daniel', 'Estado': 'Desconectado', 'Numero': '3002' },
            { 'Nombre': 'Antonio', 'Estado': 'Conectado', 'Numero': '3001' },
            { 'Nombre': 'Daniel', 'Estado': 'Desconectado', 'Numero': '3001' },
            { 'Nombre': 'Carlos', 'Estado': 'Conectado', 'Numero': '3001' },
            { 'Nombre': 'Daniel', 'Estado': 'Desconectado', 'Numero': '3002' },
            { 'Nombre': 'Daniel', 'Estado': 'Conectado', 'Numero': '3001' },
            { 'Nombre': 'Manuel', 'Estado': 'Desconectado', 'Numero': '3001' },
            { 'Nombre': 'Daniel', 'Estado': 'Conectado', 'Numero': '3001' },
            { 'Nombre': 'Daniel', 'Estado': 'Desconectado', 'Numero': '3002' },
            { 'Nombre': 'Antonio', 'Estado': 'Conectado', 'Numero': '3001' },
            { 'Nombre': 'Daniel', 'Estado': 'Desconectado', 'Numero': '3001' },
            { 'Nombre': 'Carlos', 'Estado': 'Conectado', 'Numero': '3001' },
            { 'Nombre': 'Daniel', 'Estado': 'Desconectado', 'Numero': '3002' },
        ];
    }
    ContactosComponent.prototype.ngOnInit = function () { this.listarContacto(); };
    ContactosComponent.prototype.AgregarContacto = function () {
        this.modalRef = this.modalService.show(agregar_contacto_component_1.AgregarContactosComponent);
    };
    ContactosComponent.prototype.EditarContacto = function () {
        this.router.navigate(['/Administrador/EditarContacto']);
    };
    ContactosComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template);
    };
    ContactosComponent.prototype.listarContacto = function () {
        var _this = this;
        this.userservice.findAllUsuario()
            .subscribe(function (rt) {
            console.log('Estos son los contactos existentes... \n');
            _this.contactos = rt;
            console.log(_this.contactos);
        }, function (er) { return console.log(er); }, function () { return console.log('terminado'); });
    };
    ContactosComponent = __decorate([
        core_1.Component({
            selector: 'contactos',
            templateUrl: './contactos.component.html',
            providers: [user_service_1.UserService],
        }),
        __metadata("design:paramtypes", [router_1.Router,
            modal_1.BsModalService, user_service_1.UserService])
    ], ContactosComponent);
    return ContactosComponent;
}());
exports.ContactosComponent = ContactosComponent;
