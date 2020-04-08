import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SipService } from '@services/sip.service';
var RadiosComponent = /** @class */ (function () {
    function RadiosComponent(router, sipservice) {
        this.router = router;
        this.sipservice = sipservice;
    }
    RadiosComponent.prototype.ngOnInit = function () {
        this.listarRadios();
    };
    RadiosComponent.prototype.listarRadios = function () {
        var _this = this;
        this.sipservice.findAllSip()
            .subscribe(function (response) {
            console.log('Estos son los Sips existentes... \n');
            _this.radios = response;
            console.log(_this.radios);
        }, function (er) { return console.log(er); });
    };
    RadiosComponent = __decorate([
        Component({
            selector: 'radios',
            templateUrl: './radios.component.html',
            providers: [SipService]
        }),
        __metadata("design:paramtypes", [Router,
            SipService])
    ], RadiosComponent);
    return RadiosComponent;
}());
export { RadiosComponent };
