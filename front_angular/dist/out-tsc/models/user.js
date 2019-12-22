"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(nombre, apPaterno, apMaterno, direccion, telefono, correo, password) {
        this.nombre = nombre;
        this.apPaterno = apPaterno;
        this.apMaterno = apMaterno;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correo = correo;
        this.password = password;
        this.conectado = false;
        this.salaId = '2';
        this.tipo = 'standard';
    }
    return User;
}());
exports.User = User;
