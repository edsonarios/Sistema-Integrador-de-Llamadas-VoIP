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
var SalaCardComponent = /** @class */ (function () {
    function SalaCardComponent(router) {
        this.router = router;
    }
    SalaCardComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SalaCardComponent.prototype, "Nombre", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SalaCardComponent.prototype, "Descripcion", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SalaCardComponent.prototype, "IdSala", void 0);
    SalaCardComponent = __decorate([
        core_1.Component({
            selector: 'sala-card',
            templateUrl: './sala_card.component.html',
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], SalaCardComponent);
    return SalaCardComponent;
}());
exports.SalaCardComponent = SalaCardComponent;
