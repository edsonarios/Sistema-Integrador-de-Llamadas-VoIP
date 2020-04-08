var Sip = /** @class */ (function () {
    function Sip(name, secret, callerid, usuarioId, type) {
        this.name = name;
        this.secret = secret;
        this.callerid = callerid;
        this.usuarioId = usuarioId;
        this.type = type;
        this.context = 'default',
            this.host = 'dynamic',
            this.disallow = 'disallow',
            this.allow = 'ulaw',
            this.qualify = 'yes',
            this.nat = 'force_rport,comedia';
    }
    Object.defineProperty(Sip.prototype, "getId", {
        get: function () {
            return this.usuarioId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sip.prototype, "setId", {
        set: function (value) {
            this.usuarioId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sip.prototype, "getName", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sip.prototype, "setName", {
        set: function (value) {
            this.name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sip.prototype, "getSecret", {
        get: function () {
            return this.secret;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sip.prototype, "setSecret", {
        set: function (value) {
            this.secret = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sip.prototype, "getType", {
        get: function () {
            return this.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sip.prototype, "setType", {
        set: function (value) {
            this.type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sip.prototype, "getContext", {
        get: function () {
            return this.context;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sip.prototype, "setContext", {
        set: function (value) {
            this.context = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sip.prototype, "getHost", {
        get: function () {
            return this.host;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sip.prototype, "setHost", {
        set: function (value) {
            this.host = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sip.prototype, "getDisallow", {
        get: function () {
            return this.disallow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sip.prototype, "setDisallow", {
        set: function (value) {
            this.disallow = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sip.prototype, "getAllow", {
        get: function () {
            return this.allow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sip.prototype, "setAllow", {
        set: function (value) {
            this.allow = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sip.prototype, "getCallerid", {
        get: function () {
            return this.callerid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sip.prototype, "setCallerid", {
        set: function (value) {
            this.callerid = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sip.prototype, "getQualify", {
        get: function () {
            return this.qualify;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sip.prototype, "setQualify", {
        set: function (value) {
            this.qualify = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sip.prototype, "getNat", {
        get: function () {
            return this.nat;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sip.prototype, "setNat", {
        set: function (value) {
            this.nat = value;
        },
        enumerable: true,
        configurable: true
    });
    return Sip;
}());
export { Sip };
