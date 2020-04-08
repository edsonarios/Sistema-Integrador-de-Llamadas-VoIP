import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
var ContactoCardComponent = /** @class */ (function () {
    function ContactoCardComponent(router) {
        this.router = router;
    }
    ContactoCardComponent.prototype.ngOnInit = function () {
        localStorage.removeItem('idContacto');
    };
    ContactoCardComponent.prototype.Detalles = function () {
        localStorage.setItem('idContacto', this.Id);
        this.router.navigate(['/Administrador/DetalleContacto']);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ContactoCardComponent.prototype, "Nombre", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ContactoCardComponent.prototype, "Paterno", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ContactoCardComponent.prototype, "Materno", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ContactoCardComponent.prototype, "Correo", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ContactoCardComponent.prototype, "Direccion", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ContactoCardComponent.prototype, "Telefono", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ContactoCardComponent.prototype, "Tipo", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ContactoCardComponent.prototype, "Conectado", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ContactoCardComponent.prototype, "Id", void 0);
    ContactoCardComponent = __decorate([
        Component({
            selector: 'contacto-card',
            templateUrl: './contacto_card.component.html'
        }),
        __metadata("design:paramtypes", [Router])
    ], ContactoCardComponent);
    return ContactoCardComponent;
}());
export { ContactoCardComponent };
