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
// import { Sala } from '../../../../models/sala';
var animations_1 = require("services/animations");
var modal_1 = require("ngx-bootstrap/modal");
var forms_1 = require("@angular/forms");
// import { DialPadComponent } from '../../pages/operador/dialpad/dialpad.component';
var dialpad_component_1 = require("@operador/dialpad/dialpad.component");
var OperadorTemplateComponent = /** @class */ (function () {
    function OperadorTemplateComponent(modalService, formBuilder) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.Hide = true;
        /*
            const contador=interval(1000);
    
            contador.subscribe((n)=>{
                this.datoNumber=n;
                console.log('Dato Number :'+n);
            });
    */
    }
    OperadorTemplateComponent.prototype.ngOnInit = function () {
        this.sala = [
            { nombreSala: 'Sala 1', descripcion: 'Descripcion', usuarioId: '1' },
            { nombreSala: 'Sala 2', descripcion: 'Descripcion2', usuarioId: '2' },
            { nombreSala: 'Sala 3', descripcion: 'Descripcion3', usuarioId: '3' }
        ];
        this.user = {
            nombre: 'usuario',
            apPaterno: 'userPat',
            apMaterno: 'userMat',
            tipo: 'Operador',
            direccion: 'Prueba',
            telefono: '12345',
            correo: 'ope@operador',
            password: '1234',
            conectado: true,
            salaId: '1'
        };
    };
    OperadorTemplateComponent.prototype.LoaderPage = function (funtion) {
        if (funtion == 'page') {
            this.Hide = false;
        }
        else {
            if (funtion == 'operational') {
                this.Hide = true;
            }
        }
    };
    OperadorTemplateComponent.prototype.DialPadComponent = function () {
        this.modalRef = this.modalService.show(dialpad_component_1.DialPadComponent);
    };
    OperadorTemplateComponent = __decorate([
        core_1.Component({
            selector: 'operador-template',
            templateUrl: './operador-template.component.html',
            animations: [animations_1.Entrance, animations_1.Quit]
        }),
        __metadata("design:paramtypes", [modal_1.BsModalService, forms_1.FormBuilder])
    ], OperadorTemplateComponent);
    return OperadorTemplateComponent;
}());
exports.OperadorTemplateComponent = OperadorTemplateComponent;
