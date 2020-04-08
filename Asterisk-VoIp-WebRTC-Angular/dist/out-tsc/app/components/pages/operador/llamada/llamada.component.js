import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
//import { RTCSession } from 'jssip';
var LlamadaComponent = /** @class */ (function () {
    //session: WebRTCService;
    function LlamadaComponent(router) {
        this.router = router;
        this.llamadaClose = new EventEmitter();
        this.Participantes = new EventEmitter();
    }
    LlamadaComponent.prototype.ngOnInit = function () {
        //this.session = new WebRTCService();
    };
    LlamadaComponent.prototype.CerrarLlamada = function (nombre, numero, id_llamada, tipo) {
        this.llamada = { Nombre: nombre, Numero: numero, Id: id_llamada, Tipo: tipo };
        this.llamadaClose.emit(this.llamada);
        console.log('Entra ');
    };
    LlamadaComponent.prototype.VerParticipantes = function () {
        this.Participantes.emit('Ver Participantes');
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LlamadaComponent.prototype, "Nombre", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LlamadaComponent.prototype, "Numero", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LlamadaComponent.prototype, "Tipo", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LlamadaComponent.prototype, "Id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LlamadaComponent.prototype, "Estado", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LlamadaComponent.prototype, "Session", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], LlamadaComponent.prototype, "llamadaClose", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], LlamadaComponent.prototype, "Participantes", void 0);
    LlamadaComponent = __decorate([
        Component({
            selector: 'llamada',
            templateUrl: './llamada.component.html'
        }),
        __metadata("design:paramtypes", [Router])
    ], LlamadaComponent);
    return LlamadaComponent;
}());
export { LlamadaComponent };
