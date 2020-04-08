import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
var GrabacionesComponent = /** @class */ (function () {
    function GrabacionesComponent(router) {
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
    GrabacionesComponent.prototype.ngOnInit = function () { };
    GrabacionesComponent.prototype.DescargarAudio = function () {
        //Metodo de descarga
        console.log('Descargando...');
    };
    GrabacionesComponent = __decorate([
        Component({
            selector: 'grabaciones',
            templateUrl: './grabaciones.component.html'
        }),
        __metadata("design:paramtypes", [Router])
    ], GrabacionesComponent);
    return GrabacionesComponent;
}());
export { GrabacionesComponent };
