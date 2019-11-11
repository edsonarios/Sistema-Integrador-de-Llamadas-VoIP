"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(nombre, apPaterno, apMaterno, tipo, direccion, telefono, correo, password, conectado, salaId) {
        this.nombre = nombre;
        this.apPaterno = apPaterno;
        this.apMaterno = apMaterno;
        this.tipo = tipo;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correo = correo;
        this.password = password;
        this.conectado = conectado;
        this.salaId = salaId;
    }
    return User;
}());
exports.User = User;
