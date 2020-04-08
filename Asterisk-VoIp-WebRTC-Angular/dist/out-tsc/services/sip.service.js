import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Sip } from '../models/sip';
import { GLOBAL } from './global';
var SipService = /** @class */ (function () {
    function SipService(http) {
        this.http = http;
        // Http Headers
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        this.url = GLOBAL.url;
    }
    SipService.prototype.addSIP = function (alias, numero, tipo, password, idu) {
        this.sip = new Sip(alias, password, numero, idu, tipo);
        console.log('Datos obtenido para la extension SIP......');
        console.log(this.sip);
        return this.http.post(this.url + 'addSip', this.sip, this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    };
    SipService.prototype.deleteSip = function (idd) {
        return this.http.delete(this.url + 'deleteSip' + { id: idd });
    };
    SipService.prototype.llenarSIPsYIAX = function (idu) {
        return this.http.post(this.url + 'getUsuariosWithSipsAndIaxs', { id: idu }, this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    };
    SipService.prototype.findAllSip = function () {
        return this.http.get(this.url + 'findAllSip').pipe(retry(1), catchError(this.errorHandl));
    };
    // Error handling
    SipService.prototype.errorHandl = function (error) {
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
    SipService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], SipService);
    return SipService;
}());
export { SipService };
