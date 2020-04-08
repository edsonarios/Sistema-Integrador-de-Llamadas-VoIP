import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SalaService } from '@services/sala.service';
var AgregarSalaComponent = /** @class */ (function () {
    function AgregarSalaComponent(router, formBuilder, serviceSala) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.serviceSala = serviceSala;
    }
    AgregarSalaComponent.prototype.ngOnInit = function () {
        this.addForm = this.formBuilder.group({
            nombreSala: ['', Validators.required],
            descripcion: ['', Validators.required]
        });
    };
    AgregarSalaComponent.prototype.addSala = function () {
        console.log(this.addForm.value);
        this.serviceSala.addSala(this.addForm.value).subscribe(function (response) {
            console.log(response);
        }, function (er) { return console.log(er); }, function () { return console.log('terminado'); });
    };
    AgregarSalaComponent = __decorate([
        Component({
            selector: 'agregarSala',
            templateUrl: './agregar_sala.component.html',
            providers: [SalaService]
        }),
        __metadata("design:paramtypes", [Router,
            FormBuilder,
            SalaService])
    ], AgregarSalaComponent);
    return AgregarSalaComponent;
}());
export { AgregarSalaComponent };
