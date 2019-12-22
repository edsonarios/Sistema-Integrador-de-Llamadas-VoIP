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
var sala_service_1 = require("../../../../../services/sala.service");
var SalasComponent = /** @class */ (function () {
    function SalasComponent(router, serviceSala) {
        this.router = router;
        this.serviceSala = serviceSala;
        this.Salas = [
            {
                'nombre': 'Sala 1',
                'id': '1',
                'Dimesions': '10',
                'Ocupando': '2',
                'Numero': '3001'
            },
            {
                'nombre': 'Sala 2',
                'id': '2',
                'Dimesions': '5',
                'Ocupando': '1',
                'Numero': '3002'
            },
            {
                'nombre': 'Emergencias 1',
                'id': '3',
                'Dimesions': '5',
                'Ocupando': '3',
                'Numero': '3003'
            },
            {
                'nombre': 'Emergencias 2',
                'id': '4',
                'Dimesions': '5',
                'Ocupando': '0',
                'Numero': '3004'
            },
            {
                'nombre': 'Emergencia 3',
                'id': '5',
                'Dimesions': '5',
                'Ocupando': '1',
                'Numero': '3005'
            },
            {
                'nombre': 'Radio 1',
                'id': '6',
                'Dimesions': '4',
                'Ocupando': '4',
                'Numero': '3006'
            },
            {
                'nombre': 'Radio 2',
                'id': '7',
                'Dimesions': '2',
                'Ocupando': '0',
                'Numero': '3007'
            }
        ];
    }
    SalasComponent.prototype.ngOnInit = function () {
        console.log(this.Salas);
        this.recibirSalas();
    };
    SalasComponent.prototype.recibirSalas = function () {
        var _this = this;
        this.serviceSala.listarSalas()
            .subscribe(function (response) {
            console.log(response);
            _this.sala = response;
        }, function (er) { return console.log(er); }, function () { return console.log('terminado'); });
    };
    SalasComponent = __decorate([
        core_1.Component({
            selector: 'salas',
            templateUrl: './salas.component.html',
            providers: [sala_service_1.SalaService]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            sala_service_1.SalaService])
    ], SalasComponent);
    return SalasComponent;
}());
exports.SalasComponent = SalasComponent;
