import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from '@services/user.service';
import { AgregarContactosComponent } from './agregar_contacto/agregar_contacto.component';
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
        this.modalRef = this.modalService.show(AgregarContactosComponent);
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
        }, function (er) { return console.log(er); });
    };
    ContactosComponent = __decorate([
        Component({
            selector: 'contactos',
            templateUrl: './contactos.component.html',
            providers: [UserService],
        }),
        __metadata("design:paramtypes", [Router,
            BsModalService, UserService])
    ], ContactosComponent);
    return ContactosComponent;
}());
export { ContactosComponent };
