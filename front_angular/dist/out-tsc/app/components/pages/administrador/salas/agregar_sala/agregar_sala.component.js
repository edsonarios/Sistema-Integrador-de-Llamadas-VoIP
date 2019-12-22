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
var sala_service_1 = require("../../../../../../services/sala.service");
var AgregarSalaComponent = /** @class */ (function () {
    function AgregarSalaComponent(router, formBuilder, serviceSala) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.serviceSala = serviceSala;
    }
    AgregarSalaComponent.prototype.ngOnInit = function () {
        this.addForm = this.formBuilder.group({
            nombreSala: ['', forms_1.Validators.required],
            descripcion: ['', forms_1.Validators.required]
        });
    };
    AgregarSalaComponent.prototype.addSala = function () {
        console.log(this.addForm.value);
        this.serviceSala.addSala(this.addForm.value)
            .subscribe(function (response) {
            console.log(response);
        }, function (er) { return console.log(er); }, function () { return console.log('terminado'); });
    };
    AgregarSalaComponent = __decorate([
        core_1.Component({
            selector: 'agregarSala',
            templateUrl: './agregar_sala.component.html',
            providers: [sala_service_1.SalaService],
        }),
        __metadata("design:paramtypes", [router_1.Router,
            forms_1.FormBuilder,
            sala_service_1.SalaService])
    ], AgregarSalaComponent);
    return AgregarSalaComponent;
}());
exports.AgregarSalaComponent = AgregarSalaComponent;
