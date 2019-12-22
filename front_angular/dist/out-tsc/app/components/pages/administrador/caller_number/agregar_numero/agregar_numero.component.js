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
var sip_service_1 = require("@services/sip.service");
var iax_service_1 = require("@services/iax.service");
var AgregarNumeroComponent = /** @class */ (function () {
    function AgregarNumeroComponent(route, router, formBuilder, serviceSip, serviceIax) {
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
        this.serviceSip = serviceSip;
        this.serviceIax = serviceIax;
    }
    AgregarNumeroComponent.prototype.ngOnInit = function () {
        this.identy = this.route.snapshot.paramMap.get('id');
        console.log(this.route.snapshot.paramMap.get('id'));
        this.addForm = this.formBuilder.group({
            alias: ['', forms_1.Validators.required],
            tipo: ['', forms_1.Validators.required],
            numero: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
    };
    AgregarNumeroComponent.prototype.addnumero = function () {
        if (this.addForm.value.tipo == 'SIP') {
            this.serviceSip.addSIP(this.addForm.value.alias, this.addForm.value.numero, { type: 'friend' }, this.addForm.value.password, this.identy)
                .subscribe(function (rt) {
                console.log('added SIP Extension... ');
                console.log(rt);
            }, function (er) { return console.log(er); }, function () { return console.log('terminado'); });
        }
        else if (this.addForm.value.tipo == 'IAX') {
            this.serviceIax.addIAX(this.addForm.value.alias, this.addForm.value.numero, 'friend', this.addForm.value.password, this.identy)
                .subscribe(function (rt) {
                console.log('added IAX Extension... ');
                console.log(rt);
            }, function (er) { return console.log(er); }, function () { return console.log('terminado'); });
        }
        console.log(this.addForm.value);
    };
    AgregarNumeroComponent = __decorate([
        core_1.Component({
            selector: 'AgregarNumero',
            templateUrl: './agregar_numero.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            forms_1.FormBuilder,
            sip_service_1.SipService,
            iax_service_1.IaxService])
    ], AgregarNumeroComponent);
    return AgregarNumeroComponent;
}());
exports.AgregarNumeroComponent = AgregarNumeroComponent;
