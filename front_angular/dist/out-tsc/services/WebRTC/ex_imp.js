"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var config_ws_service_1 = require("./config-ws.service");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.msg = "Events";
        this.arr = [];
        this.audioRemote = (document.getElementById("audio-remote"));
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var s = new config_ws_service_1.ConfigWSService();
        this.service = s;
        this.service.eventWebSocket();
        this.service.getUA().on("newRTCSession", function (data) {
            var session = data.session;
            _this.arr.push(session);
            _this.sessionLocal = session;
            console.log("[ NEW RTC SESSION ]", data);
            console.log("[ NEW RTC DATA ]", data.session.connection);
            if (data.originator === "local") {
                console.log("LLAMADA LOCAL");
            }
            else if (data.originator === "remote") {
                console.log("LLAMADA REMOTA");
            }
            console.log(_this.arr);
        });
        this.msg = s.getMsg();
    };
    AppComponent.prototype.conectar = function () {
        this.msg = this.service.connect();
        console.log(this.msg);
    };
    AppComponent.prototype.desconectar = function () {
        this.msg = this.service.disconnect();
        console.log(this.msg);
    };
    AppComponent.prototype.registrar = function () {
        this.msg = this.service.register();
    };
    // Llamar a un sip
    AppComponent.prototype.call = function (sip) {
        this.service.call(sip);
    };
    AppComponent.prototype.responder = function () {
        var _this = this;
        var options = {
            mediaConstraints: {},
            pcConfig: {
                iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }]
            }
        };
        this.arr[this.arr.length - 1].answer(options);
        this.arr[this.arr.length - 1].connection.addEventListener("addstream", function (e) {
            _this.audioRemote.srcObject = e.stream;
            _this.audioRemote.play();
        });
    };
    AppComponent.prototype.terminar = function () {
        this.arr[this.arr.length - 1].terminate();
    };
    AppComponent.prototype.mute = function () {
        this.arr[this.arr.length - 1].mute();
    };
    AppComponent.prototype.unmute = function () {
        this.arr[this.arr.length - 1].unmute();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "app-root",
            templateUrl: "./app.component.html",
            styleUrls: ["./app.component.scss"]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
