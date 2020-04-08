import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { WebRTCService } from './../WebRTC.service';
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.arr = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        this.session = new WebRTCService();
        this.session.sessionEvents();
        this.event = this.session.newRTCSession();
        this.alert = this.session.getMessage();
        this.arr.push(this.event);
    };
    AppComponent.prototype.conectar = function () {
        this.session.connect();
        this.alert = this.session.getMessage();
    };
    AppComponent.prototype.desconectar = function () {
        this.session.disconnect();
        this.alert = this.session.getMessage();
    };
    AppComponent.prototype.sipCall = function (sip) {
        this.session.sipCall(sip);
    };
    AppComponent.prototype.endCall = function () {
        this.session.terminate();
    };
    AppComponent.prototype.responder = function () {
        this.session.remoteAnswer();
    };
    AppComponent.prototype.mute = function () {
        this.session.mute();
    };
    AppComponent.prototype.unmute = function () {
        this.session.unmute();
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
