import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SipService } from '@services/sip.service';
var AgregarRadioComponent = /** @class */ (function () {
    function AgregarRadioComponent(router, formBuilder, serviceSip) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.serviceSip = serviceSip;
    }
    AgregarRadioComponent.prototype.ngOnInit = function () {
        this.addForm = this.formBuilder.group({
            alias: ['', Validators.required],
            numero: ['', Validators.required],
            password: ['', Validators.required]
        });
    };
    AgregarRadioComponent.prototype.addradio = function () {
        console.log(this.addForm.value);
        this.serviceSip.addSIP(this.addForm.value.alias, this.addForm.value.numero, 'radio', this.addForm.value.password, 25)
            .subscribe(function (response) {
            console.log('added Radio SIP Extension... ');
            console.log(response);
        }, function (er) { return console.log(er); });
        this.addForm = this.formBuilder.group({
            alias: [''],
            numero: [''],
            password: ['']
        });
    };
    AgregarRadioComponent = __decorate([
        Component({
            selector: 'agrega-radio',
            templateUrl: './agregar_radio.component.html'
        }),
        __metadata("design:paramtypes", [Router,
            FormBuilder,
            SipService])
    ], AgregarRadioComponent);
    return AgregarRadioComponent;
}());
export { AgregarRadioComponent };
