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
var AgendaComponent = /** @class */ (function () {
    function AgendaComponent(router) {
        this.router = router;
        this.Contactos = [
            { Nombre: 'Daniel', Estado: 'Conectado', Numero: '3001' },
            { Nombre: 'Juan', Estado: 'Desconectado', Numero: '3001' },
            { Nombre: 'Marco', Estado: 'Conectado', Numero: '3001' },
            { Nombre: 'Mario', Estado: 'Desconectado', Numero: '3002' },
            { Nombre: 'Alonso', Estado: 'Conectado', Numero: '3001' },
            { Nombre: 'Edgar', Estado: 'Desconectado', Numero: '3001' },
            { Nombre: 'Daniel', Estado: 'Conectado', Numero: '3001' },
            { Nombre: 'Ramiro', Estado: 'Desconectado', Numero: '3002' },
            { Nombre: 'Daniel', Estado: 'Conectado', Numero: '3001' },
            { Nombre: 'Manuel', Estado: 'Desconectado', Numero: '3001' }
        ];
    }
    AgendaComponent.prototype.ngOnInit = function () { };
    AgendaComponent.prototype.LlamadaComponent = function () {
        console.log('Procediendo a llamar');
    };
    AgendaComponent = __decorate([
        core_1.Component({
            selector: 'Agenda',
            templateUrl: './agenda.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], AgendaComponent);
    return AgendaComponent;
}());
exports.AgendaComponent = AgendaComponent;
