import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
var ParticipanteComponent = /** @class */ (function () {
    function ParticipanteComponent(router) {
        this.router = router;
    }
    ParticipanteComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ParticipanteComponent.prototype, "Nombre", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ParticipanteComponent.prototype, "Paterno", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ParticipanteComponent.prototype, "Materno", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ParticipanteComponent.prototype, "Sip", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ParticipanteComponent.prototype, "Iax", void 0);
    ParticipanteComponent = __decorate([
        Component({
            selector: 'Participante',
            templateUrl: './participante.component.html'
        }),
        __metadata("design:paramtypes", [Router])
    ], ParticipanteComponent);
    return ParticipanteComponent;
}());
export { ParticipanteComponent };
