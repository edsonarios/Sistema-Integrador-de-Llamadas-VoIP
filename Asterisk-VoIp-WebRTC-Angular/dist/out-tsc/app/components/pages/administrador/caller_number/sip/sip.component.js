import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SipService } from '@services/sip.service';
var SipComponent = /** @class */ (function () {
    function SipComponent(route, router, serviceSip) {
        this.route = route;
        this.router = router;
        this.serviceSip = serviceSip;
    }
    SipComponent.prototype.ngOnInit = function () {
    };
    SipComponent.prototype.eliminarsip = function () {
        this.identy = this.route.snapshot.paramMap.get('id');
        console.log(this.identy);
        this.serviceSip.deleteSip(this.identy)
            .subscribe(function (rt) {
            console.log(rt);
        }, function (er) { return console.log(er); }, function () { return console.log('terminado'); });
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SipComponent.prototype, "Alias", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SipComponent.prototype, "Numero", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SipComponent.prototype, "Context", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SipComponent.prototype, "Id", void 0);
    SipComponent = __decorate([
        Component({
            selector: 'sip',
            templateUrl: './sip.component.html'
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            Router,
            SipService])
    ], SipComponent);
    return SipComponent;
}());
export { SipComponent };
