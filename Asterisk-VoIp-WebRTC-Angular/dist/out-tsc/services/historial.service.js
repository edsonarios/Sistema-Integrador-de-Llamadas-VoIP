import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from './global';
var HistorialService = /** @class */ (function () {
    function HistorialService(http) {
        this.http = http;
        this.idUser = localStorage.getItem('idUser');
        // Http Headers
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        this.url = GLOBAL.url;
    }
    HistorialService.prototype.HistorialLlamadas = function () {
        return this.http.get(this.url + 'findAllCdr').pipe(retry(1), catchError(this.errorHandl));
    };
    // Error handling
    HistorialService.prototype.errorHandl = function (error) {
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
    HistorialService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], HistorialService);
    return HistorialService;
}());
export { HistorialService };
