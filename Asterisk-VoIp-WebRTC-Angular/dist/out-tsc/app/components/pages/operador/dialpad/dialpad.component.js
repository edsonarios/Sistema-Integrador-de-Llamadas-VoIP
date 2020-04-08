import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { WebRTCService } from '@services/WebRTC/WebRTC.service';
var DialPadComponent = /** @class */ (function () {
    function DialPadComponent(router, modalService) {
        this.router = router;
        this.modalService = modalService;
        this.dialNumber = '';
        this.mute = false;
        this.arr = [];
    }
    DialPadComponent.prototype.DialNum = function (Num) {
        this.dialNumber = this.dialNumber + Num;
    };
    DialPadComponent.prototype.Llamada = function () {
        this.sipCall(this.dialNumber);
        this.Limpiar();
    };
    DialPadComponent.prototype.Limpiar = function () {
        this.dialNumber = '';
    };
    DialPadComponent.prototype.ngOnInit = function () {
        this.session = new WebRTCService();
        this.session.sessionEvents();
        this.event = this.session.newRTCSession();
        this.alert = this.session.getMessage();
        this.arr.push(this.event);
    };
    DialPadComponent.prototype.conectar = function () {
        this.session.connect();
        this.alert = this.session.getMessage();
    };
    DialPadComponent.prototype.desconectar = function () {
        this.session.disconnect();
        this.alert = this.session.getMessage();
    };
    DialPadComponent.prototype.sipCall = function (sip) {
        this.session.sipCall(sip);
    };
    DialPadComponent.prototype.endCall = function () {
        this.session.terminate();
    };
    DialPadComponent.prototype.callMute = function () {
        this.session.mute();
        this.mute = true;
    };
    DialPadComponent.prototype.callUnmute = function () {
        this.session.unmute();
        this.mute = false;
    };
    DialPadComponent = __decorate([
        Component({
            selector: 'dialpad',
            templateUrl: './dialpad.component.html'
        }),
        __metadata("design:paramtypes", [Router, BsModalService])
    ], DialPadComponent);
    return DialPadComponent;
}());
export { DialPadComponent };
