import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HistorialService } from '@services/historial.service';
//import * as moment from 'moment';
var HistorialLlamadasComponent = /** @class */ (function () {
    function HistorialLlamadasComponent(hllamadas, router) {
        this.hllamadas = hllamadas;
        this.router = router;
        this.Todos = [];
        this.History = [];
        this.Ocupado = [];
        this.Entrante = [];
        this.Perdida = [];
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
    HistorialLlamadasComponent.prototype.todos = function () {
        this.swH = false;
        console.log(this.swH);
        this.History = this.Todos;
    };
    HistorialLlamadasComponent.prototype.cambio = function () {
        this.History = this.Ocupado;
        this.swH = false;
    };
    //// ojo
    HistorialLlamadasComponent.prototype.saliente = function () {
        this.History = this.Ocupado;
        this.swH = false;
    };
    HistorialLlamadasComponent.prototype.entrante = function () {
        this.History = this.Entrante;
        this.swH = false;
    };
    HistorialLlamadasComponent.prototype.perdida = function () {
        this.History = this.Perdida;
        this.swH = false;
    };
    /*
        historial() {
            this.hllamadas.HistorialLlamadas().subscribe(
                response => {
                    console.log('Historial de llamadas... \n');
                    this.History = response;
                    this.Todos = response;
    
                    this.History.forEach(element => {
                        var segun = element.billsec + '';
                        if (segun.length == 1) element.billsec = '0' + element.billsec;
                        element.calldate =
                            moment(element.calldate)
                                .subtract(10, 'days')
                                .calendar() +
                            '\n ( ' +
                            moment(element.calldate).format('LTS') +
                            ' )';
                    });
    
                    // this.History.forEach(element => {
                    // 	console.log(element);
                    // });
    
                    this.History.forEach(element => {
                        if (element.disposition == 'ANSWERED') this.Entrante.push(element);
                        if (element.disposition == 'NO ANSWERED') this.Perdida.push(element);
                        if (element.disposition == 'BUSY') this.Ocupado.push(element);
                    });
                },
                er => console.log(er)
            );
        }*/
    HistorialLlamadasComponent.prototype.salientes = function () {
        var _this = this;
        this.hllamadas.HistorialLlamadas().subscribe(function (response) {
            console.log('Historial de llamadas... \n');
            _this.History = response;
            _this.History.forEach(function (element) {
                if (element.disposition == 'ANSWERED')
                    _this.Entrante.push(element);
                if (element.disposition == 'NO ANSWERED')
                    _this.Perdida.push(element);
                if (element.disposition == 'BUSY')
                    _this.Ocupado.push(element);
            });
            // this.History.forEach(element => {
            //   console.log(element.disposition);
            // });
            console.log('LLAMADAS ENTRANTES...');
            _this.Entrante.forEach(function (element) {
                console.log(element.disposition);
            });
            console.log('LLAMADAS PERDIDAS');
            _this.Perdida.forEach(function (element) {
                console.log(element.disposition);
            });
            console.log('LLAMADA EN OCUPADO');
            _this.Ocupado.forEach(function (element) {
                console.log(element.disposition);
            });
        }, function (er) { return console.log(er); });
    };
    HistorialLlamadasComponent.prototype.onChange = function (event) {
        //console.log(event);
    };
    HistorialLlamadasComponent.prototype.ngOnInit = function () {
        //	this.historial();
    };
    HistorialLlamadasComponent.prototype.cssch = function () {
        document.getElementById('nav').style.cssText = 'background: red;';
    };
    HistorialLlamadasComponent = __decorate([
        Component({
            selector: 'Historial-Llamadas',
            templateUrl: './historial_llamadas.component.html'
        }),
        __metadata("design:paramtypes", [HistorialService, Router])
    ], HistorialLlamadasComponent);
    return HistorialLlamadasComponent;
}());
export { HistorialLlamadasComponent };
