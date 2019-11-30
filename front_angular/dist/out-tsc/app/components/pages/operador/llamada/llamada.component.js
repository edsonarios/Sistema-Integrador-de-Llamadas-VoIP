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
var LlamadaComponent = /** @class */ (function () {
    function LlamadaComponent(router) {
        this.router = router;
        this.llamadaClose = new core_1.EventEmitter();
        this.Participantes = new core_1.EventEmitter();
    }
    LlamadaComponent.prototype.ngOnInit = function () { };
    LlamadaComponent.prototype.CerrarLlamada = function (nombre, numero, id_llamada, tipo) {
        this.llamada = { 'Nombre': nombre, 'Numero': numero, 'Id': id_llamada, 'Tipo': tipo };
        this.llamadaClose.emit(this.llamada);
    };
    LlamadaComponent.prototype.VerParticipantes = function () {
        this.Participantes.emit('Ver Participantes');
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LlamadaComponent.prototype, "Nombre", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LlamadaComponent.prototype, "Numero", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LlamadaComponent.prototype, "Tipo", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LlamadaComponent.prototype, "Id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LlamadaComponent.prototype, "Estado", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], LlamadaComponent.prototype, "llamadaClose", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], LlamadaComponent.prototype, "Participantes", void 0);
    LlamadaComponent = __decorate([
        core_1.Component({
            selector: 'llamada',
            templateUrl: './llamada.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], LlamadaComponent);
    return LlamadaComponent;
}());
exports.LlamadaComponent = LlamadaComponent;
