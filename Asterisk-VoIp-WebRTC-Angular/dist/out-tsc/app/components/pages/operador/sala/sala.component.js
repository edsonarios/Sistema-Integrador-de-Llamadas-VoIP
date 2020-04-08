import { __decorate, __metadata } from "tslib";
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
var SalaComponent = /** @class */ (function () {
    function SalaComponent(router) {
        this.router = router;
        this.DatoSala = new EventEmitter();
    }
    //session: WebRTCService;
    //event: RTCSession;
    SalaComponent.prototype.ngOnInit = function () {
        //this.session = new WebRTCService();
    };
    SalaComponent.prototype.EntrarSala = function (Nombre, id_sala, desc) {
        this.sala = { nombre: Nombre, id: id_sala, descripcion: desc };
        this.DatoSala.emit(this.sala);
        // Llamando al SIP 1 😂
        //this.sipCall('7001');
        console.log(this.sala);
    };
    SalaComponent.prototype.sipCall = function (sip) {
        //this.session.sipCall(sip);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SalaComponent.prototype, "Nombre", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SalaComponent.prototype, "Descripcion", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SalaComponent.prototype, "Id", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SalaComponent.prototype, "DatoSala", void 0);
    SalaComponent = __decorate([
        Component({
            selector: 'Sala',
            templateUrl: './sala.component.html'
        }),
        __metadata("design:paramtypes", [Router])
    ], SalaComponent);
    return SalaComponent;
}());
export { SalaComponent };
