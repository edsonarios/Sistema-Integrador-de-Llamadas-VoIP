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
var HistorialLlamadasComponent = /** @class */ (function () {
    function HistorialLlamadasComponent(router) {
        this.router = router;
        this.Historial = [
            {
                Nombre: 'Daniel',
                Numero: '3001',
                Tipo: 'Entrante',
                Origen: 'Caja',
                Destino: 'Patrulla',
                Duracion: '02:30 min',
                Fecha: '05/02/2019',
                Audio: 'jfdsafdsajp1321.wmp'
            },
            {
                Nombre: 'Daniel',
                Numero: '3001',
                Tipo: 'Saliente',
                Origen: 'Caja',
                Destino: 'Patrulla',
                Duracion: '02:30 min',
                Fecha: '05/02/2019',
                Audio: 'jfdsafdsajp1321.wmp'
            },
            {
                Nombre: 'Daniel',
                Numero: '3001',
                Tipo: 'Entrante',
                Origen: 'Caja',
                Destino: 'Patrulla',
                Duracion: '02:30 min',
                Fecha: '05/02/2019',
                Audio: 'jfdsafdsajp1321.wmp'
            },
            {
                Nombre: 'Daniel',
                Numero: '3001',
                Tipo: 'Perdida',
                Origen: 'Caja',
                Destino: 'Patrulla',
                Duracion: '02:30 min',
                Fecha: '05/02/2019',
                Audio: 'jfdsafdsajp1321.wmp'
            },
            {
                Nombre: 'Daniel',
                Numero: '3001',
                Tipo: 'Entrante',
                Origen: 'Caja',
                Destino: 'Patrulla',
                Duracion: '02:30 min',
                Fecha: '05/02/2019',
                Audio: 'jfdsafdsajp1321.wmp'
            },
            {
                Nombre: 'Daniel',
                Numero: '3001',
                Tipo: 'Saliente',
                Origen: 'Caja',
                Destino: 'Patrulla',
                Duracion: '02:30 min',
                Fecha: '05/02/2019',
                Audio: 'jfdsafdsajp1321.wmp'
            },
            {
                Nombre: 'Daniel',
                Numero: '3001',
                Tipo: 'Saliente',
                Origen: 'Caja',
                Destino: 'Patrulla',
                Duracion: '02:30 min',
                Fecha: '05/02/2019',
                Audio: 'jfdsafdsajp1321.wmp'
            },
            {
                Nombre: 'Daniel',
                Numero: '3001',
                Tipo: 'Perdida',
                Origen: 'Caja',
                Destino: 'Patrulla',
                Duracion: '02:30 min',
                Fecha: '05/02/2019',
                Audio: 'jfdsafdsajp1321.wmp'
            },
            {
                Nombre: 'Daniel',
                Numero: '3001',
                Tipo: 'Entrante',
                Origen: 'Caja',
                Destino: 'Patrulla',
                Duracion: '02:30 min',
                Fecha: '05/02/2019',
                Audio: 'jfdsafdsajp1321.wmp'
            }
        ];
    }
    HistorialLlamadasComponent.prototype.ngOnInit = function () { };
    HistorialLlamadasComponent.prototype.cssch = function () {
        document.getElementById('nav').style.cssText = 'background: red;';
    };
    HistorialLlamadasComponent = __decorate([
        core_1.Component({
            selector: 'Historial-Llamadas',
            templateUrl: './historial_llamadas.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], HistorialLlamadasComponent);
    return HistorialLlamadasComponent;
}());
exports.HistorialLlamadasComponent = HistorialLlamadasComponent;
