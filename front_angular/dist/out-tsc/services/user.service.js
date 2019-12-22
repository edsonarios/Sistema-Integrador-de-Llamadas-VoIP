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
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var user_1 = require("../models/user");
var global_1 = require("./global");
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.idUser = localStorage.getItem('idUser');
        // Http Headers
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        this.url = global_1.GLOBAL.url;
    }
    UserService.prototype.datosPrueba = function () {
        return this.http.get(this.url + 'datosPrueba').pipe(operators_1.retry(1), operators_1.catchError(this.errorHandl));
    };
    UserService.prototype.findAllUsuario = function () {
        return this.http.get(this.url + 'findAllUsuario').pipe(operators_1.retry(1), operators_1.catchError(this.errorHandl));
    };
    UserService.prototype.datosRoot = function () {
        return this.http.get(this.url + 'datosRoot').pipe(operators_1.retry(1), operators_1.catchError(this.errorHandl));
    };
    UserService.prototype.datosOperador = function () {
        return this.http.get(this.url + 'datosOperador').pipe(operators_1.retry(1), operators_1.catchError(this.errorHandl));
    };
    UserService.prototype.login = function (user) {
        return this.http.post(this.url + 'login', JSON.stringify(user), this.httpOptions).pipe(operators_1.retry(1), operators_1.catchError(this.errorHandl));
    };
    UserService.prototype.addUsuario = function (user) {
        this.user = new user_1.User(user.nombre, user.apPaterno, user.apMaterno, user.direccion, user.telefono, user.correo, user.password);
        console.log('Datos registrados de Contacto ...   ');
        console.log(this.user);
        return this.http.post(this.url + 'addUsuario', this.user, this.httpOptions).pipe(operators_1.retry(1), operators_1.catchError(this.errorHandl));
    };
    UserService.prototype.updateUser = function (user, dd) {
        return this.http.put(this.url + 'updateUsuario', {
            nombre: user.nombre, apPaterno: user.apPaterno,
            apMaterno: user.apMaterno, tipo: user.tipo, direccion: user.direccion,
            telefono: user.telefono, correo: user.correo, password: user.password,
            conectado: user.conectado, id: dd
        }, this.httpOptions).pipe(operators_1.retry(1), operators_1.catchError(this.errorHandl));
    };
    UserService.prototype.findByIdUsuario = function (identy) {
        return this.http.post(this.url + 'findByIdUsuario', { id: identy }, this.httpOptions).pipe(operators_1.retry(1), operators_1.catchError(this.errorHandl));
    };
    UserService.prototype.listarContactos = function () {
        return this.http.get(this.url + 'findAllUsuario').pipe(operators_1.retry(1), operators_1.catchError(this.errorHandl));
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
        return rxjs_1.throwError(errorMessage);
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
