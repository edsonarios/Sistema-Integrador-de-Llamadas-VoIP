"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sip = /** @class */ (function () {
    function Sip(name, secret, callerid, type, context, host, disallow, allow, usuarioId) {
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
    return Sip;
}());
exports.Sip = Sip;
