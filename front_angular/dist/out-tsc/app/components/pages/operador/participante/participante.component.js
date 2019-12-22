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
var ParticipanteComponent = /** @class */ (function () {
    function ParticipanteComponent(router) {
        this.router = router;
    }
    ParticipanteComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ParticipanteComponent.prototype, "Nombre", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ParticipanteComponent.prototype, "Paterno", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ParticipanteComponent.prototype, "Materno", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ParticipanteComponent.prototype, "Sip", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ParticipanteComponent.prototype, "Iax", void 0);
    ParticipanteComponent = __decorate([
        core_1.Component({
            selector: 'Participante',
            templateUrl: './participante.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], ParticipanteComponent);
    return ParticipanteComponent;
}());
exports.ParticipanteComponent = ParticipanteComponent;
