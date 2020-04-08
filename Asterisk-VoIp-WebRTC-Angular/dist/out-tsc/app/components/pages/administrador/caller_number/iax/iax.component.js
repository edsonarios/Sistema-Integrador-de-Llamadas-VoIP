import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IaxService } from '@services/iax.service';
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
        Input(),
        __metadata("design:type", String)
    ], IaxComponent.prototype, "Alias", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], IaxComponent.prototype, "Numero", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], IaxComponent.prototype, "Context", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], IaxComponent.prototype, "Id", void 0);
    IaxComponent = __decorate([
        Component({
            selector: 'iax',
            templateUrl: './iax.component.html'
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            Router,
            IaxService])
    ], IaxComponent);
    return IaxComponent;
}());
export { IaxComponent };
