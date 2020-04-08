import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
var NotificacionComponent = /** @class */ (function () {
    function NotificacionComponent(router) {
        this.router = router;
        this.ContestaLlamada = new EventEmitter();
        this.CancelaLlamada = new EventEmitter();
    }
    NotificacionComponent.prototype.ngOnInit = function () { };
    NotificacionComponent.prototype.ContestarLlamada = function (nombre, numero, id) {
        this.notificacion = { Nombre: nombre, Numero: numero, Id: id };
        this.ContestaLlamada.emit(this.notificacion);
    };
    NotificacionComponent.prototype.ColgarLlamada = function (nombre, numero, id) {
        this.notificacion = { Nombre: nombre, Numero: numero, Id: id };
        this.CancelaLlamada.emit(this.notificacion);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NotificacionComponent.prototype, "Nombre", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NotificacionComponent.prototype, "Numero", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NotificacionComponent.prototype, "Estado", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NotificacionComponent.prototype, "Id", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NotificacionComponent.prototype, "ContestaLlamada", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NotificacionComponent.prototype, "CancelaLlamada", void 0);
    NotificacionComponent = __decorate([
        Component({
            selector: 'Notificacion',
            templateUrl: './notificacion.component.html'
        }),
        __metadata("design:paramtypes", [Router])
    ], NotificacionComponent);
    return NotificacionComponent;
}());
export { NotificacionComponent };
