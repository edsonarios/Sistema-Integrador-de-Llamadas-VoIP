import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Iax } from '../models/iax';
import { GLOBAL } from './global';
var IaxService = /** @class */ (function () {
    function IaxService(http) {
        this.http = http;
        // Http Headers
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        this.url = GLOBAL.url;
    }
    //   this.addForm.value.alias,
    //   this.addForm.value.numero,
    //   'friend',  
    //   this.addForm.value.password, 
    //   this.identy
    IaxService.prototype.addIAX = function (alias, numero, tipo, password, idu) {
        this.iax = new Iax(alias, password, numero, idu, tipo);
        console.log('Datos obtenido para la extension SIP......');
        console.log(this.iax);
        return this.http.post(this.url + 'addIax', this.iax, this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    };
    IaxService.prototype.deleteIax = function (idd) {
        return this.http.delete(this.url + 'deleteIax' + { id: idd });
    };
    IaxService.prototype.llenarSIPsYIAX = function (idu) {
        return this.http.post(this.url + 'getUsuariosWithSipsAndIaxs', { id: idu }, this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    };
    // Error handling
    IaxService.prototype.errorHandl = function (error) {
        var errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        }
        else {
            // Get server-side error
            errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    };
    IaxService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], IaxService);
    return IaxService;
}());
export { IaxService };
