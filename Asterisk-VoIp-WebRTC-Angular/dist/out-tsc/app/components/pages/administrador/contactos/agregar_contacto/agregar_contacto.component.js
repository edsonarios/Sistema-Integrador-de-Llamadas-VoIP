import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@services/user.service';
var AgregarContactosComponent = /** @class */ (function () {
    function AgregarContactosComponent(router, formBuilder, serviceUser) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.serviceUser = serviceUser;
        this.wrong = false;
        this.loading = false;
        this.submitted = true;
    }
    AgregarContactosComponent.prototype.ngOnInit = function () {
        this.addForm = this.formBuilder.group({
            nombre: ['', Validators.required],
            apPaterno: ['', Validators.required],
            apMaterno: ['', Validators.required],
            direccion: ['', Validators.required],
            telefono: ['', Validators.required],
            correo: ['', Validators.required],
            password: ['', Validators.required],
            tipo: ['', Validators.required]
        });
    };
    AgregarContactosComponent.prototype.onSubmit = function () {
        this.submitted = false;
        if (!this.addForm.invalid) {
            return;
        }
        alert('Mensaje enviado...');
    };
    Object.defineProperty(AgregarContactosComponent.prototype, "f", {
        get: function () {
            return this.addForm.controls;
        },
        enumerable: true,
        configurable: true
    });
    AgregarContactosComponent.prototype.crearcontacto = function () {
        this.serviceUser.addUsuario(this.addForm.value)
            .subscribe(function (rt) {
            console.log(rt);
            console.log(rt.id);
        }, function (er) { return console.log(er); }, function () { return console.log('terminado'); });
        console.log(this.addForm.value);
        window.alert("Usuario Creado");
        this.router.navigate(['/Administrador/Contactos']);
    };
    AgregarContactosComponent.prototype.cerrar = function (e) {
        e.close();
    };
    AgregarContactosComponent = __decorate([
        Component({
            selector: 'agregar-cotacto',
            templateUrl: './agregar_contacto.component.html',
            providers: [UserService],
        }),
        __metadata("design:paramtypes", [Router,
            FormBuilder,
            UserService])
    ], AgregarContactosComponent);
    return AgregarContactosComponent;
}());
export { AgregarContactosComponent };
