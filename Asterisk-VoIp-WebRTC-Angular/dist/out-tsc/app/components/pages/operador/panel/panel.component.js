import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
var PanelComponent = /** @class */ (function () {
    function PanelComponent(router) {
        this.router = router;
        this.Panel = [];
    }
    PanelComponent.prototype.ngOnInit = function () {
        this.Panel = this.Objeto;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PanelComponent.prototype, "Tiempo", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PanelComponent.prototype, "Objeto", void 0);
    PanelComponent = __decorate([
        Component({
            selector: 'panel',
            templateUrl: './panel.component.html'
        }),
        __metadata("design:paramtypes", [Router])
    ], PanelComponent);
    return PanelComponent;
}());
export { PanelComponent };
