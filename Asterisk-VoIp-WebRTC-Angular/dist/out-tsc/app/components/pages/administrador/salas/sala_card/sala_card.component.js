import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SalaService } from '@services/sala.service';
var SalaCardComponent = /** @class */ (function () {
    function SalaCardComponent(router, serviceSala) {
        this.router = router;
        this.serviceSala = serviceSala;
    }
    SalaCardComponent.prototype.ngOnInit = function () { };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SalaCardComponent.prototype, "Nombre", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SalaCardComponent.prototype, "Descripcion", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SalaCardComponent.prototype, "IdSala", void 0);
    SalaCardComponent = __decorate([
        Component({
            selector: 'sala-card',
            templateUrl: './sala_card.component.html',
            providers: [SalaService]
        }),
        __metadata("design:paramtypes", [Router, SalaService])
    ], SalaCardComponent);
    return SalaCardComponent;
}());
export { SalaCardComponent };
