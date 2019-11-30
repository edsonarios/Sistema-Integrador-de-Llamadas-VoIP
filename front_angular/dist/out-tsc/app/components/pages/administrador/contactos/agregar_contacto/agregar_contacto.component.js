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
var sip_service_1 = require("@services/sip.service");
var modal_1 = require("ngx-bootstrap/modal");
var AgregarContactosComponent = /** @class */ (function () {
    function AgregarContactosComponent(router, formBuilder, formBuilder2, serviceUser, serviceSip, modalRef) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.formBuilder2 = formBuilder2;
        this.serviceUser = serviceUser;
        this.serviceSip = serviceSip;
        this.modalRef = modalRef;
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
        });
        this.addFormSip = this.formBuilder2.group({
            name: ['', forms_1.Validators.required],
            callerId: ['', forms_1.Validators.required]
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
    AgregarContactosComponent.prototype.adjuntarSip = function (idu) {
        this.serviceSip.addSIP(this.addFormSip.value.name, this.addForm.value.callerId, idu)
            .subscribe(function (rt) {
            console.log('added SIP Extension... ');
            console.log(rt);
        }, function (er) { return console.log(er); }, function () { return console.log('terminado'); });
        console.log(this.addForm.value);
    };
    AgregarContactosComponent.prototype.crearcontacto = function () {
        var _this = this;
        this.serviceUser.addUsuario(this.addForm.value)
            .subscribe(function (rt) {
            console.log(rt);
            console.log(rt.id);
            _this.adjuntarSip(rt.id);
        }, function (er) { return console.log(er); }, function () { return console.log('terminado'); });
        console.log("Eh aqui los datos susodichos...   ");
        console.log(this.addForm.value);
        console.log('Tambien los datos para el envio de los datos SIP..   ');
        console.log(this.addFormSip.value);
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
            forms_1.FormBuilder,
            user_service_1.UserService,
            sip_service_1.SipService,
            modal_1.BsModalRef])
    ], AgregarContactosComponent);
    return AgregarContactosComponent;
}());
exports.AgregarContactosComponent = AgregarContactosComponent;
