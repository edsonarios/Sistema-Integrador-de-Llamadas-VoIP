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
var sip_1 = require("../models/sip");
var global_1 = require("./global");
var SipService = /** @class */ (function () {
    function SipService(http) {
        this.http = http;
        // Http Headers
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        this.url = global_1.GLOBAL.url;
    }
    SipService.prototype.addSIP = function (alias, numero, tipo, password, idu) {
        this.sip = new sip_1.Sip(alias, password, numero, idu, tipo);
        console.log('Datos obtenido para la extension SIP......');
        console.log(this.sip);
        return this.http.post(this.url + 'addSip', this.sip, this.httpOptions).pipe(operators_1.retry(1), operators_1.catchError(this.errorHandl));
    };
    SipService.prototype.deleteSip = function (idd) {
        return this.http.delete(this.url + 'deleteSip' + { id: idd });
    };
    SipService.prototype.llenarSIPsYIAX = function (idu) {
        return this.http.post(this.url + 'getUsuariosWithSipsAndIaxs', { id: idu }, this.httpOptions).pipe(operators_1.retry(1), operators_1.catchError(this.errorHandl));
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
        return rxjs_1.throwError(errorMessage);
    };
    SipService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], SipService);
    return SipService;
}());
exports.SipService = SipService;
