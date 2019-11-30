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
var SalasComponent = /** @class */ (function () {
    function SalasComponent(router) {
        this.router = router;
        this.ParticipantesSala = [
            {
                'Id': '1',
                'Nombre': 'Nelson Richard',
                'ApPaterno': 'Cori',
                'ApMaterno': 'Sirpa',
                'Sip': [
                    {
                        'Numero': '3001',
                        'Alias': '3001',
                        'context': 'default'
                    },
                    {
                        'Numero': '3002',
                        'Alias': '3002',
                        'context': 'default'
                    }
                ],
                'Iax': [
                    {
                        'Numero': '3003',
                        'Alias': '3003',
                        'context': 'default'
                    }
                ]
            },
            {
                'Id': '2',
                'Nombre': 'Edson',
                'ApPaterno': 'Añawaya',
                'ApMaterno': 'Rios',
                'Sip': [
                    {
                        'Numero': '3003',
                        'Alias': '3003',
                        'context': 'default'
                    },
                    {
                        'Numero': '3004',
                        'Alias': '3004',
                        'context': 'default'
                    }
                ],
                'Iax': [
                    {
                        'Numero': '3005',
                        'Alias': '3006',
                        'context': 'default'
                    }
                ]
            }
        ];
    }
    SalasComponent.prototype.ngOnInit = function () {
        console.log(this.ParticipantesSala);
    };
    SalasComponent = __decorate([
        core_1.Component({
            selector: 'salas',
            templateUrl: './salas.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], SalasComponent);
    return SalasComponent;
}());
exports.SalasComponent = SalasComponent;
