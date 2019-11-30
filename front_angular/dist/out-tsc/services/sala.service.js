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
var global_1 = require("./global");
var SalaService = /** @class */ (function () {
    function SalaService(http) {
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
    SalaService.prototype.addSala = function (sala) {
        return this.http.post(this.url + 'addSala', sala, this.httpOptions).pipe(operators_1.retry(1), operators_1.catchError(this.errorHandl));
    };
    SalaService.prototype.listarSalas = function () {
        return this.http.get(this.url + 'findAllSala').pipe(operators_1.retry(1), operators_1.catchError(this.errorHandl));
    };
    SalaService.prototype.buscarSala = function () {
        return this.http.post(this.url + 'findByIdSala', "ID sala", this.httpOptions).pipe(operators_1.retry(1), operators_1.catchError(this.errorHandl));
    };
    SalaService.prototype.updateSala = function () {
        return this.http.put(this.url + 'updateSala', "ID sala", this.httpOptions).pipe(operators_1.retry(1), operators_1.catchError(this.errorHandl));
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
        return rxjs_1.throwError(errorMessage);
    };
    SalaService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], SalaService);
    return SalaService;
}());
exports.SalaService = SalaService;
