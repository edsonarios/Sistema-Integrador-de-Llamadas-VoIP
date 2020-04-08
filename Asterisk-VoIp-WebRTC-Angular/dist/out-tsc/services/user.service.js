import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { GLOBAL } from './global';
var UserService = /** @class */ (function () {
    function UserService(http) {
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
    UserService.prototype.datosPrueba = function () {
        return this.http.get(this.url + 'datosPrueba').pipe(retry(1), catchError(this.errorHandl));
    };
    UserService.prototype.findAllUsuario = function () {
        return this.http.get(this.url + 'findAllUsuario').pipe(retry(1), catchError(this.errorHandl));
    };
    UserService.prototype.datosRoot = function () {
        return this.http.get(this.url + 'datosRoot').pipe(retry(1), catchError(this.errorHandl));
    };
    UserService.prototype.datosOperador = function () {
        return this.http.get(this.url + 'datosOperador').pipe(retry(1), catchError(this.errorHandl));
    };
    UserService.prototype.login = function (user) {
        return this.http.post(this.url + 'login', JSON.stringify(user), this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    };
    UserService.prototype.addUsuario = function (user) {
        this.user = new User(user.nombre, user.apPaterno, user.apMaterno, user.direccion, user.telefono, user.correo, user.password);
        console.log('Datos registrados de Contacto ...   ');
        console.log(this.user);
        return this.http.post(this.url + 'addUsuario', this.user, this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    };
    UserService.prototype.updateUser = function (user, dd) {
        return this.http.put(this.url + 'updateUsuario', {
            nombre: user.nombre, apPaterno: user.apPaterno,
            apMaterno: user.apMaterno, tipo: user.tipo, direccion: user.direccion,
            telefono: user.telefono, correo: user.correo, password: user.password,
            conectado: user.conectado, id: dd
        }, this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    };
    UserService.prototype.findByIdUsuario = function (identy) {
        return this.http.post(this.url + 'findByIdUsuario', { id: identy }, this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    };
    UserService.prototype.listarContactos = function () {
        return this.http.get(this.url + 'findAllUsuario').pipe(retry(1), catchError(this.errorHandl));
    };
    // Error handling
    UserService.prototype.errorHandl = function (error) {
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
    UserService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], UserService);
    return UserService;
}());
export { UserService };
