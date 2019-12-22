"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Iax = /** @class */ (function () {
    // alias, password, numero, idu, tipo
    function Iax(name, secret, callerid, usuarioId, type) {
        this.name = name;
        this.secret = secret;
        this.callerid = callerid;
        this.usuarioId = usuarioId;
        this.type = type;
        this.context = 'default',
            this.host = 'dynamic',
            this.disallow = 'disallow',
            this.allow = 'ulaw';
    }
    Object.defineProperty(Iax.prototype, "getId", {
        get: function () {
            return this.usuarioId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Iax.prototype, "setId", {
        set: function (value) {
            this.usuarioId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Iax.prototype, "getName", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Iax.prototype, "setName", {
        set: function (value) {
            this.name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Iax.prototype, "getSecret", {
        get: function () {
            return this.secret;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Iax.prototype, "setSecret", {
        set: function (value) {
            this.secret = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Iax.prototype, "getType", {
        get: function () {
            return this.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Iax.prototype, "setType", {
        set: function (value) {
            this.type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Iax.prototype, "getContext", {
        get: function () {
            return this.context;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Iax.prototype, "setContext", {
        set: function (value) {
            this.context = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Iax.prototype, "getHost", {
        get: function () {
            return this.host;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Iax.prototype, "setHost", {
        set: function (value) {
            this.host = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Iax.prototype, "getDisallow", {
        get: function () {
            return this.disallow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Iax.prototype, "setDisallow", {
        set: function (value) {
            this.disallow = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Iax.prototype, "getAllow", {
        get: function () {
            return this.allow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Iax.prototype, "setAllow", {
        set: function (value) {
            this.allow = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Iax.prototype, "getCallerid", {
        get: function () {
            return this.callerid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Iax.prototype, "setCallerid", {
        set: function (value) {
            this.callerid = value;
        },
        enumerable: true,
        configurable: true
    });
    return Iax;
}());
exports.Iax = Iax;
