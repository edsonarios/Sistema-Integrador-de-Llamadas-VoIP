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
var modal_1 = require("ngx-bootstrap/modal");
//import { UserService } from '@services/user.service';
//import { SipService } from '@services/sip.service';
var EditarContactoComponent = /** @class */ (function () {
    function EditarContactoComponent(router, formBuilder, modalRef) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.modalRef = modalRef;
        this.wrong = false;
        this.loading = false;
        this.submitted = true;
    }
    EditarContactoComponent.prototype.ngOnInit = function () {
        this.addForm = this.formBuilder.group({
            nombre: ['', forms_1.Validators.required],
            apellido: ['', forms_1.Validators.required],
            alias: ['', forms_1.Validators.required],
            telnumero: ['', forms_1.Validators.required],
            tipo: ['', forms_1.Validators.required],
            descripcion: ['', forms_1.Validators.required]
        });
    };
    EditarContactoComponent.prototype.onSubmit = function () {
    };
    Object.defineProperty(EditarContactoComponent.prototype, "f", {
        get: function () {
            return this.addForm.controls;
        },
        enumerable: true,
        configurable: true
    });
    EditarContactoComponent.prototype.crearcontacto = function () {
    };
    EditarContactoComponent.prototype.cerrar = function (e) {
        e.close();
    };
    EditarContactoComponent = __decorate([
        core_1.Component({
            selector: 'editar-cotacto',
            templateUrl: './editar_contacto.component.html',
        }),
        __metadata("design:paramtypes", [router_1.Router,
            forms_1.FormBuilder,
            modal_1.BsModalRef])
    ], EditarContactoComponent);
    return EditarContactoComponent;
}());
exports.EditarContactoComponent = EditarContactoComponent;
