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
var SalaComponent = /** @class */ (function () {
    function SalaComponent(router) {
        this.router = router;
        this.DatoSala = new core_1.EventEmitter();
    }
    SalaComponent.prototype.ngOnInit = function () { };
    SalaComponent.prototype.EntrarSala = function (Nombre, id_sala, numero) {
        this.sala = { 'nombre': Nombre, 'id': id_sala, 'numero': numero };
        this.DatoSala.emit(this.sala);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SalaComponent.prototype, "Nombre", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SalaComponent.prototype, "Ocupado", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SalaComponent.prototype, "Dimensions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SalaComponent.prototype, "Numero", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SalaComponent.prototype, "Id", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], SalaComponent.prototype, "DatoSala", void 0);
    SalaComponent = __decorate([
        core_1.Component({
            selector: 'Sala',
            templateUrl: './sala.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], SalaComponent);
    return SalaComponent;
}());
exports.SalaComponent = SalaComponent;
