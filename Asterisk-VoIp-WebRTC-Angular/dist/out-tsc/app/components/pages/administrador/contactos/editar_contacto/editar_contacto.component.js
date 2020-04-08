import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@services/user.service';
var EditarContactoComponent = /** @class */ (function () {
    function EditarContactoComponent(route, router, formBuilder, serviceUser) {
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
        this.serviceUser = serviceUser;
        this.wrong = false;
        this.loading = false;
        this.submitted = true;
        this.identy = this.route.snapshot.paramMap.get('id');
    }
    EditarContactoComponent.prototype.ngOnInit = function () {
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
        console.log(this.route.snapshot.paramMap.get('id'));
        this.inicializar(this.route.snapshot.paramMap.get('id'));
    };
    EditarContactoComponent.prototype.inicializar = function (dd) {
        var _this = this;
        this.serviceUser.findByIdUsuario(dd)
            .subscribe(function (rt) {
            //console.log(rt);
            _this.addForm = _this.formBuilder.group({
                nombre: [rt.nombre, Validators.required],
                apPaterno: [rt.apPaterno, Validators.required],
                apMaterno: [rt.apMaterno, Validators.required],
                direccion: [rt.direccion, Validators.required],
                telefono: [rt.telefono, Validators.required],
                correo: [rt.correo, Validators.required],
                password: [rt.password, Validators.required],
                tipo: [rt.tipo, Validators.required]
            });
        }, function (er) { return console.log(er); }, function () { return console.log('terminado'); });
    };
    Object.defineProperty(EditarContactoComponent.prototype, "f", {
        get: function () {
            return this.addForm.controls;
        },
        enumerable: true,
        configurable: true
    });
    EditarContactoComponent.prototype.editarcontacto = function () {
        this.serviceUser.updateUser(this.addForm.value, this.route.snapshot.paramMap.get('id'))
            .subscribe(function (response) {
            console.log(response);
        }, function (er) { return console.log(er); }, function () { return console.log('terminado'); });
        this.router.navigate(['/Administrador/DetalleContacto']);
    };
    EditarContactoComponent.prototype.cerrar = function (e) {
        e.close();
    };
    EditarContactoComponent = __decorate([
        Component({
            selector: 'editar-cotacto',
            templateUrl: './editar_contacto.component.html',
            providers: [UserService],
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            Router,
            FormBuilder,
            UserService])
    ], EditarContactoComponent);
    return EditarContactoComponent;
}());
export { EditarContactoComponent };
