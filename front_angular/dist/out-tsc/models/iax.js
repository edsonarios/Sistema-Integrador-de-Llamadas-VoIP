"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Iax = /** @class */ (function () {
    function Iax(name, secret, callerid, type, context, host, disallow, allow, usuarioId) {
        this.name = name;
        this.secret = secret;
        this.callerid = callerid;
        this.type = type;
        this.context = context;
        this.host = host;
        this.disallow = disallow;
        this.allow = allow;
        this.usuarioId = usuarioId;
    }
    return Iax;
}());
exports.Iax = Iax;
