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
var router_1 = require("@angular/router");
var user_service_1 = require("@services/user.service");
var sip_service_1 = require("@services/sip.service");
var user_1 = require("@models/user");
var DetalleContactoComponent = /** @class */ (function () {
    function DetalleContactoComponent(route, router, serviceUser, serviceSip) {
        this.route = route;
        this.router = router;
        this.serviceUser = serviceUser;
        this.serviceSip = serviceSip;
        this.Contact = user_1.User;
        this.Sip_Iax = [];
        this.identy = this.route.snapshot.paramMap.get('id');
        this.llenarform(this.route.snapshot.paramMap.get('id'));
        this.llenarSIPsYIAX(this.route.snapshot.paramMap.get('id'));
    }
    DetalleContactoComponent.prototype.ngOnInit = function () {
        console.log(this.Contact);
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
        core_1.Component({
            selector: 'DetalleContacto',
            templateUrl: './detalle_contacto.component.html',
            providers: [user_service_1.UserService, sip_service_1.SipService]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            user_service_1.UserService,
            sip_service_1.SipService])
    ], DetalleContactoComponent);
    return DetalleContactoComponent;
}());
exports.DetalleContactoComponent = DetalleContactoComponent;
