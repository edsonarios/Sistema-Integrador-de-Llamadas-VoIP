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
var jssip_1 = require("jssip");
var config_1 = require("./config");
var ConfigWSService = /** @class */ (function () {
    // SIP, SECRET
    function ConfigWSService(sip, secret) {
        if (sip === void 0) { sip = "7010"; }
        if (secret === void 0) { secret = "7010"; }
        this.audioLocal = (document.getElementById("audio-local"));
        this.audioRemote = (document.getElementById("audio-remote"));
        // Configuracion basica
        this.socket = this.createWebSocketInterface();
        this.sip = sip;
        this.secret = secret;
        this.config = {
            sockets: [this.socket],
            authorization_user: sip,
            ws_servers: config_1.config.WS,
            uri: "sip:" + sip + "@" + config_1.config.HOST,
            display_name: sip,
            password: secret,
            contact_uri: "sip:" + sip + "@" + config_1.config.HOST,
            realm: config_1.config.HOST
        };
        // Create DOM Audio
        // const audio = document.createElement("AUDIO");
        // audio.id = "audio-local";
        // document.body.firstElementChild.append(audio);
        this.connect();
    }
    ConfigWSService.prototype.createWebSocketInterface = function () {
        return new jssip_1.default.WebSocketInterface(config_1.config.WS);
    };
    ConfigWSService.prototype.connect = function () {
        this.ua = new jssip_1.default.UA(this.config);
        this.ua.start();
        console.log("[ GET ]", this.ua);
        this.msg = "CONECTANDO";
        return "CONECTANDO";
    };
    ConfigWSService.prototype.register = function () {
        if (!this.ua.isRegistered()) {
            this.ua.register();
            this.msg = "REGISTRADO";
            return "REGISTRADO";
        }
    };
    ConfigWSService.prototype.disconnect = function () {
        this.ua.unregister();
        this.ua.stop();
        this.msg = "NO REGISTRADO";
        return "NO REGISTRADO";
    };
    ConfigWSService.prototype.eventWebSocket = function () {
        this.ua.on("connected", function (e) {
            console.log("[ CONECTADO ]", e);
        });
        this.ua.on("disconnected", function (e) {
            console.log("[ DESCONECTADO ]", e);
        });
        this.ua.on("registered", function (e) {
            console.log("[ REGISTRADO ]", e);
        });
        this.ua.on("unregistered", function (e) {
            console.log("[ NO REGISTRADO ]", e);
        });
        this.ua.on("registrationFailed", function (e) {
            console.log("[ NO REGISTRADO FALLANDO ]", e);
        });
    };
    ConfigWSService.prototype.call = function (sip) {
        var _this = this;
        var eventHandlers = {
            progress: function (e) {
                console.log("Llamada en progreso");
            },
            failed: function (e) {
                console.log("Llamada fallida: " + e.data.cause);
            },
            ended: function (e) {
                console.log("Llamada perdida: " + e.data.cause);
            },
            confirmed: function (e) {
                console.log("Llamada confirmada");
            }
        };
        var options = {
            eventHandlers: eventHandlers,
            mediaConstraints: {
                audio: true,
                video: false
            },
            pcConfig: {
                iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }]
            }
        };
        if (sip != "") {
            var session = this.ua.call("sip:" + sip + "@" + config_1.config.HOST, options);
            if (session) {
                // media para el navegador
                session.connection.addEventListener("addstream", function (e) {
                    _this.audioLocal.srcObject = e.stream;
                    _this.audioLocal.play();
                });
            }
        }
    };
    ConfigWSService.prototype.setSIP = function (sip) {
        this.sip = sip;
    };
    ConfigWSService.prototype.setSecret = function (secret) {
        this.secret = secret;
    };
    ConfigWSService.prototype.getMsg = function () {
        return this.msg;
    };
    ConfigWSService.prototype.getUA = function () {
        return this.ua;
    };
    ConfigWSService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [String, String])
    ], ConfigWSService);
    return ConfigWSService;
}());
exports.ConfigWSService = ConfigWSService;
