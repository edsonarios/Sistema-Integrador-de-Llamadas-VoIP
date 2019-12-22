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
var iax_service_1 = require("@services/iax.service");
var IaxComponent = /** @class */ (function () {
    function IaxComponent(route, router, serviceIax) {
        this.route = route;
        this.router = router;
        this.serviceIax = serviceIax;
    }
    IaxComponent.prototype.ngOnInit = function () {
    };
    IaxComponent.prototype.eliminariax = function () {
        this.identy = this.route.snapshot.paramMap.get('id');
        console.log(this.identy);
        this.serviceIax.deleteIax(this.identy)
            .subscribe(function (rt) {
            console.log(rt);
        }, function (er) { return console.log(er); }, function () { return console.log('terminado'); });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], IaxComponent.prototype, "Alias", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], IaxComponent.prototype, "Numero", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], IaxComponent.prototype, "Context", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], IaxComponent.prototype, "Id", void 0);
    IaxComponent = __decorate([
        core_1.Component({
            selector: 'iax',
            templateUrl: './iax.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            iax_service_1.IaxService])
    ], IaxComponent);
    return IaxComponent;
}());
exports.IaxComponent = IaxComponent;
