"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var user_service_1 = require("@services/user.service");
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
            nombre: ['', forms_1.Validators.required],
            apPaterno: ['', forms_1.Validators.required],
            apMaterno: ['', forms_1.Validators.required],
            direccion: ['', forms_1.Validators.required],
            telefono: ['', forms_1.Validators.required],
            correo: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
            tipo: ['', forms_1.Validators.required]
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
        core_1.Component({
            selector: 'agregar-cotacto',
            templateUrl: './agregar_contacto.component.html',
            providers: [user_service_1.UserService],
        }),
        __metadata("design:paramtypes", [router_1.Router,
            forms_1.FormBuilder,
            user_service_1.UserService])
    ], AgregarContactosComponent);
    return AgregarContactosComponent;
}());
exports.AgregarContactosComponent = AgregarContactosComponent;
