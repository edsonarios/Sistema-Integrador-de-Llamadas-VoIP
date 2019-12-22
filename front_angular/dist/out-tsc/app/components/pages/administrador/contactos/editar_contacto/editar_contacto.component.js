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
            nombre: ['', forms_1.Validators.required],
            apPaterno: ['', forms_1.Validators.required],
            apMaterno: ['', forms_1.Validators.required],
            direccion: ['', forms_1.Validators.required],
            telefono: ['', forms_1.Validators.required],
            correo: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
            tipo: ['', forms_1.Validators.required]
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
                nombre: [rt.nombre, forms_1.Validators.required],
                apPaterno: [rt.apPaterno, forms_1.Validators.required],
                apMaterno: [rt.apMaterno, forms_1.Validators.required],
                direccion: [rt.direccion, forms_1.Validators.required],
                telefono: [rt.telefono, forms_1.Validators.required],
                correo: [rt.correo, forms_1.Validators.required],
                password: [rt.password, forms_1.Validators.required],
                tipo: [rt.tipo, forms_1.Validators.required]
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
            .subscribe(function (rt) {
            console.log(rt);
        }, function (er) { return console.log(er); }, function () { return console.log('terminado'); });
    };
    EditarContactoComponent.prototype.cerrar = function (e) {
        e.close();
    };
    EditarContactoComponent = __decorate([
        core_1.Component({
            selector: 'editar-cotacto',
            templateUrl: './editar_contacto.component.html',
            providers: [user_service_1.UserService],
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            forms_1.FormBuilder,
            user_service_1.UserService])
    ], EditarContactoComponent);
    return EditarContactoComponent;
}());
exports.EditarContactoComponent = EditarContactoComponent;
