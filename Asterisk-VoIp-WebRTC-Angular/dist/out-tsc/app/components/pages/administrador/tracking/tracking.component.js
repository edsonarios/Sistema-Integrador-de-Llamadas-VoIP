import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
var TrackingComponent = /** @class */ (function () {
    function TrackingComponent(router) {
        this.router = router;
        console.log('El tracking se cargo correctamente');
    }
    TrackingComponent.prototype.ngOnInit = function () { };
    TrackingComponent = __decorate([
        Component({
            selector: 'tracking',
            templateUrl: './tracking.component.html'
        }),
        __metadata("design:paramtypes", [Router])
    ], TrackingComponent);
    return TrackingComponent;
}());
export { TrackingComponent };
