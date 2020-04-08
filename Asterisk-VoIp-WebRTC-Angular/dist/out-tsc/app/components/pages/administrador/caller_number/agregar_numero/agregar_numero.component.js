import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SipService } from '@services/sip.service';
import { IaxService } from '@services/iax.service';
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
            alias: ['', Validators.required],
            tipo: ['', Validators.required],
            numero: ['', Validators.required],
            password: ['', Validators.required]
        });
    };
    AgregarNumeroComponent.prototype.addnumero = function () {
        if (this.addForm.value.tipo == 'SIP') {
            this.serviceSip.addSIP(this.addForm.value.alias, this.addForm.value.numero, 'friend', this.addForm.value.password, this.identy)
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
        Component({
            selector: 'AgregarNumero',
            templateUrl: './agregar_numero.component.html'
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            Router,
            FormBuilder,
            SipService,
            IaxService])
    ], AgregarNumeroComponent);
    return AgregarNumeroComponent;
}());
export { AgregarNumeroComponent };
