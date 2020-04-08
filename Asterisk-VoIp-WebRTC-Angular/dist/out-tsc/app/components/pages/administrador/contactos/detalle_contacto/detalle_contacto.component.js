import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '@services/user.service';
import { SipService } from '@services/sip.service';
import { User } from '@models/user';
var DetalleContactoComponent = /** @class */ (function () {
    function DetalleContactoComponent(route, router, serviceUser, serviceSip) {
        this.route = route;
        this.router = router;
        this.serviceUser = serviceUser;
        this.serviceSip = serviceSip;
        this.Contact = User;
        this.Sip_Iax = [];
        this.identy = localStorage.getItem('idContacto');
        this.llenarform(localStorage.getItem('idContacto'));
        this.llenarSIPsYIAX(localStorage.getItem('idContacto'));
    }
    DetalleContactoComponent.prototype.ngOnInit = function () {
    };
    DetalleContactoComponent.prototype.llenarform = function (identy) {
        var _this = this;
        this.serviceUser.findByIdUsuario(identy)
            .subscribe(function (response) {
            console.log(response);
            _this.Contact = response;
        }, function (er) { return console.log(er); }, function () { return console.log('terminado'); });
    };
    DetalleContactoComponent.prototype.llenarSIPsYIAX = function (identy) {
        var _this = this;
        this.serviceSip.llenarSIPsYIAX(identy)
            .subscribe(function (response) {
            console.log('los sips y iax son:    ');
            console.log(response);
            _this.Sip_Iax = response;
        }, function (er) { return console.log(er); }, function () { return console.log('terminado'); });
    };
    DetalleContactoComponent = __decorate([
        Component({
            selector: 'DetalleContacto',
            templateUrl: './detalle_contacto.component.html',
            providers: [UserService, SipService]
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            Router,
            UserService,
            SipService])
    ], DetalleContactoComponent);
    return DetalleContactoComponent;
}());
export { DetalleContactoComponent };
