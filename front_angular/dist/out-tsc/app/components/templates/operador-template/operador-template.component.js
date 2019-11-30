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
        this.Llamada = [];
        this.Notificaciones = [];
        this.Panel = [];
        this.Hide = true;
        this.HideLateral = true;
        this.Salas = [
            { 'nombre': 'Sala 1', 'id': '1', 'Dimesions': '10', 'Ocupando': '2', 'Numero': '3001' },
            { 'nombre': 'Sala 2', 'id': '2', 'Dimesions': '5', 'Ocupando': '1', 'Numero': '3002' },
            { 'nombre': 'Emergencias 1', 'id': '3', 'Dimesions': '5', 'Ocupando': '3', 'Numero': '3003' },
            { 'nombre': 'Emergencias 2', 'id': '4', 'Dimesions': '5', 'Ocupando': '0', 'Numero': '3004' },
            { 'nombre': 'Emergencia 3', 'id': '5', 'Dimesions': '5', 'Ocupando': '1', 'Numero': '3005' },
            { 'nombre': 'Radio 1', 'id': '6', 'Dimesions': '4', 'Ocupando': '4', 'Numero': '3006' },
            { 'nombre': 'Radio 2', 'id': '7', 'Dimesions': '2', 'Ocupando': '0', 'Numero': '3007' }
        ];
        /*this.Llamada=[{'nombre':'Daniel','id':'1','numero':'3001','Tipo':'Llamada','Estado':'Inactiva'},
                    {'nombre':'Prueba Sala','id':'2','numero':'3002','Tipo':'Sala','Estado':'Inactiva'}];*/
        //console.log(this.Salas)
        //const contador=interval(1000);
        /*contador.subscribe((n)=>{
            this.datoNumber=this.ConvertirTiempo(n);
            //console.log('Dato Number :'+n);
        });*/
    }
    OperadorTemplateComponent.prototype.ngOnInit = function () {
        this.user = {
            usuarioId: '10',
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
    OperadorTemplateComponent.prototype.AgregarEventoNotificacion = function () {
        // Metodo donde se asigna de forma aleatorea en el panel de notificaciones
        var numero = Math.round((Math.random() * (3020 - 3000) + 3000));
        var id = Math.round((Math.random() * (20 - 11) + 11));
        this.Notificaciones.push({ 'nombre': 'Alias', 'numero': numero, 'estado': 'entrante', 'id': id });
    };
    OperadorTemplateComponent.prototype.AgregarEventoPanel = function (numero, fecha, duracion, tipo) {
        //metodo en el que agregamos una nueva tupla en el panel de estados
        var horaNow = this.ObtenerTiempo();
        this.Panel.push({ 'tipo': tipo, 'Numero': numero, 'fecha': fecha, 'Hora': horaNow, 'tiempo': duracion });
    };
    OperadorTemplateComponent.prototype.RegistraSala = function (Sala) {
        // Metodo del escritorio donde se crea una ventana y se elimina de la salas
        this.Llamada.push({ 'nombre': Sala['nombre'], 'id': Sala['id'], 'numero': Sala['numero'], 'Tipo': 'Sala', 'Estado': 'Inactiva' });
        this.EliminaItemSalas(Sala['id']);
    };
    OperadorTemplateComponent.prototype.CerrarLlamada = function (llamada) {
        // Metodo en el escritorio para cerrar la llamada del escritorio
        this.EliminaItemLlamadas(llamada['Id']);
        if (llamada['Tipo'] == 'Sala') {
            this.Salas.push({ 'nombre': llamada['Nombre'], 'id': llamada['Id'], 'Dimesions': '5', 'Ocupando': '1', 'Numero': llamada['Numero'] });
        }
    };
    OperadorTemplateComponent.prototype.VerParticipantes = function (event) {
        //console.log('Llega el evento y debe de cambiar los componentes')
        if (this.HideLateral == true) {
            this.HideLateral = false;
        }
        else {
            this.HideLateral = true;
        }
    };
    OperadorTemplateComponent.prototype.AgendaLlamada = function (ContactoAgenda) {
        // metodo donde se llama a un contacto mediante la agenda
        this.Llamada.push({ 'nombre': ContactoAgenda['Nombre'], 'id': ContactoAgenda['Id'], 'numero': ContactoAgenda['Numero'], 'Tipo': 'Llamada', 'Estado': 'Inactiva' });
        this.AgregarEventoPanel(ContactoAgenda['Numero'], '15/11/2019', 'false', 'entrante');
    };
    OperadorTemplateComponent.prototype.ContestarLlamada = function (Notificacion) {
        this.Llamada.push({ 'nombre': Notificacion['Nombre'], 'id': Notificacion['Id'], 'numero': Notificacion['Numero'], 'Tipo': 'Llamada', 'Estado': 'Inactiva' });
        this.EliminaItemNotificacion(Notificacion['Id']);
        this.AgregarEventoPanel(Notificacion['Numero'], '15/11/2019', 'false', 'entrante');
    };
    OperadorTemplateComponent.prototype.ColgarLlamada = function (Notificacion) {
        this.EliminaItemNotificacion(Notificacion['Id']);
        this.AgregarEventoPanel(Notificacion['Numero'], '15/11/2019', 'false', 'perdida');
    };
    OperadorTemplateComponent.prototype.DialPadComponent = function () {
        this.modalRef = this.modalService.show(dialpad_component_1.DialPadComponent);
    };
    OperadorTemplateComponent.prototype.EliminaItemLlamadas = function (id_llamada) {
        var aux = [];
        for (var i = 0; i < this.Llamada.length; i++) {
            if (id_llamada != this.Llamada[i]['id']) {
                aux.push(this.Llamada[i]);
            }
        }
        this.Llamada = aux;
    };
    OperadorTemplateComponent.prototype.EliminaItemSalas = function (id_Salas) {
        var aux = [];
        for (var i = 0; i < this.Salas.length; i++) {
            if (id_Salas != this.Salas[i]['id']) {
                aux.push(this.Salas[i]);
            }
        }
        this.Salas = aux;
    };
    OperadorTemplateComponent.prototype.EliminaItemNotificacion = function (id_Notificacion) {
        var aux = [];
        for (var i = 0; i < this.Notificaciones.length; i++) {
            if (id_Notificacion != this.Notificaciones[i]['id']) {
                aux.push(this.Notificaciones[i]);
            }
        }
        this.Notificaciones = aux;
    };
    OperadorTemplateComponent.prototype.ConvertirTiempo = function (tiempo) {
        //  PENDIENTE
        /*var Hora= parseInt((tiempo/3600),0);
        var minutos=parseInt((tiempo-(Hora*3600))/60);
        var segundos= tiempo-(Hora*3600)-(minutos*60);
        if (segundos<10) {
            var sec='0'+segundos;
        }
        if (minutos<10) {
            var min='0'+minutos;
        }
        if (Hora<10) {
            var Hor='0'+Hora;
        }
            var Timer= Hora+':'+minutos+':'+segundos;
        return Timer;*/
    };
    OperadorTemplateComponent.prototype.MicrophoneOption = function () {
        // Aqui viene las opciones para el microfono del operador
    };
    OperadorTemplateComponent.prototype.AudioOption = function () {
        // Aqui viene las opciones para el audio del operador
    };
    OperadorTemplateComponent.prototype.NetworkSignalOption = function () {
        // Aqui viene las opciones para la red del operador
    };
    OperadorTemplateComponent.prototype.Busqueda = function () {
        //Aqui viene los metodos y/o contenido de la busqueda
    };
    OperadorTemplateComponent.prototype.ObtenerTiempo = function () {
        //Aqui viene los metodos y/o contenido de la busqueda
        var date = new Date();
        //console.log('El dato es :'+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds());
        return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    };
    OperadorTemplateComponent = __decorate([
        core_1.Component({
            selector: 'operador-template',
            templateUrl: './operador-template.component.html',
            animations: [animations_1.Entrance, animations_1.Quit, animations_1.DesktopAnimation, animations_1.EnterLeave]
        }),
        __metadata("design:paramtypes", [modal_1.BsModalService, forms_1.FormBuilder])
    ], OperadorTemplateComponent);
    return OperadorTemplateComponent;
}());
exports.OperadorTemplateComponent = OperadorTemplateComponent;
