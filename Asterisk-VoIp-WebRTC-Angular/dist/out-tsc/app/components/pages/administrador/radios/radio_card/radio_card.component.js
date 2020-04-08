import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
var RadioCardComponent = /** @class */ (function () {
    function RadioCardComponent(router) {
        this.router = router;
    }
    RadioCardComponent.prototype.ngOnInit = function () { };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], RadioCardComponent.prototype, "Alias", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], RadioCardComponent.prototype, "Numero", void 0);
    RadioCardComponent = __decorate([
        Component({
            selector: 'radio-card',
            templateUrl: './radio_card.component.html'
        }),
        __metadata("design:paramtypes", [Router])
    ], RadioCardComponent);
    return RadioCardComponent;
}());
export { RadioCardComponent };
