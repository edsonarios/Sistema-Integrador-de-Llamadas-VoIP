import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GLOBAL } from './global';
var SalaService = /** @class */ (function () {
    function SalaService(http) {
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
    SalaService.prototype.addSala = function (sala) {
        return this.http.post(this.url + 'addSala', sala, this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    };
    SalaService.prototype.listarSalas = function () {
        return this.http.get(this.url + 'findAllSala').pipe(retry(1), catchError(this.errorHandl));
    };
    SalaService.prototype.buscarSala = function () {
        return this.http.post(this.url + 'findByIdSala', "ID sala", this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    };
    SalaService.prototype.updateSala = function () {
        return this.http.put(this.url + 'updateSala', "ID sala", this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    };
    // Error handling
    SalaService.prototype.errorHandl = function (error) {
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
    SalaService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], SalaService);
    return SalaService;
}());
export { SalaService };
