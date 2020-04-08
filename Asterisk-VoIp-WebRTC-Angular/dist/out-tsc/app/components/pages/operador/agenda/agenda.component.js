import { __decorate, __metadata } from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
var AgendaComponent = /** @class */ (function () {
    function AgendaComponent(router) {
        this.router = router;
        this.AgendaLlamada = new EventEmitter();
        this.Contactos = [
            { Nombre: 'Daniel', Estado: 'Conectado', Numero: '3001', id: '21' },
            { Nombre: 'Juan', Estado: 'Desconectado', Numero: '3002', id: '22' },
            { Nombre: 'Marco', Estado: 'Conectado', Numero: '3003', id: '23' },
            { Nombre: 'Mario', Estado: 'Desconectado', Numero: '3004', id: '24' },
            { Nombre: 'Alonso', Estado: 'Conectado', Numero: '3005', id: '25' },
            { Nombre: 'Edgar', Estado: 'Desconectado', Numero: '3006', id: '26' },
            { Nombre: 'Daniel', Estado: 'Conectado', Numero: '3007', id: '27' },
            { Nombre: 'Ramiro', Estado: 'Desconectado', Numero: '3008', id: '28' },
            { Nombre: 'Daniel', Estado: 'Conectado', Numero: '3009', id: '29' },
            { Nombre: 'Manuel', Estado: 'Desconectado', Numero: '3010', id: '30' }
        ];
    }
    AgendaComponent.prototype.ngOnInit = function () { };
    AgendaComponent.prototype.LlamadaComponent = function (id, Nombre, numero) {
        this.llamada = { Nombre: Nombre, Numero: numero, Id: id };
        this.AgendaLlamada.emit(this.llamada);
    };
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AgendaComponent.prototype, "AgendaLlamada", void 0);
    AgendaComponent = __decorate([
        Component({
            selector: 'Agenda',
            templateUrl: './agenda.component.html'
        }),
        __metadata("design:paramtypes", [Router])
    ], AgendaComponent);
    return AgendaComponent;
}());
export { AgendaComponent };
