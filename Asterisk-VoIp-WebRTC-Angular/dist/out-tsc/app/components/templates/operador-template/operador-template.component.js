import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
// import { Sala } from '../../../../models/sala';
import { Entrance, Quit, DesktopAnimation, EnterLeave } from 'services/animations';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder } from '@angular/forms';
// import { DialPadComponent } from '../../pages/operador/dialpad/dialpad.component';
import { DialPadComponent } from '@operador/dialpad/dialpad.component';
import { SalaService } from '@services/sala.service';
var OperadorTemplateComponent = /** @class */ (function () {
    function OperadorTemplateComponent(modalService, formBuilder, salaService) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.salaService = salaService;
        this.Llamada = [];
        /*public Llamada=[
                        {'nombre':'Prueba Llamada',
                         'numero': '3002',
                         'Tipo': 'Llamada',
                         'id':'1',
                         'Estado':'inactiva',
                        },
                        {'nombre':'Prueba Sala',
                         'numero': '3002',
                         'Tipo': 'Sala',
                         'id':'1',
                         'Estado':'inactiva',
                        },
                        {'nombre':'Prueba Radio',
                         'numero': '3002',
                         'Tipo': 'Radio',
                         'id':'1',
                         'Estado':'inactiva',
                        },
                        ];*/
        this.Salas = [];
        this.Notificaciones = [];
        this.Panel = [];
        this.ParticipantesSala = [];
        this.Hide = true;
        this.HideLateral = true;
        this.OptionLateral = 0;
        this.pages = false;
        this.HidePanel = false;
        this.Sip_Iax = [[], []];
        this.ParticipantesSala = [
            {
                'Id': '1',
                'Nombre': 'Nelson Richard',
                'ApPaterno': 'Cori',
                'ApMaterno': 'Sirpa',
                'Sip': [
                    {
                        'Numero': '3001',
                        'Alias': '3001',
                        'context': 'default'
                    },
                    {
                        'Numero': '3002',
                        'Alias': '3002',
                        'context': 'default'
                    }
                ],
                'Iax': [
                    {
                        'Numero': '3003',
                        'Alias': '3003',
                        'context': 'default'
                    }
                ]
            },
            {
                'Id': '2',
                'Nombre': 'Edson',
                'ApPaterno': 'Añawaya',
                'ApMaterno': 'Rios',
                'Sip': [
                    {
                        'Numero': '3003',
                        'Alias': '3003',
                        'context': 'default'
                    },
                    {
                        'Numero': '3004',
                        'Alias': '3004',
                        'context': 'default'
                    }
                ],
                'Iax': [
                    {
                        'Numero': '3005',
                        'Alias': '3005',
                        'context': 'default'
                    },
                    {
                        'Numero': '3006',
                        'Alias': '3006',
                        'context': 'default'
                    }
                ]
            }
        ];
        this.AsignarSipsIax();
    }
    OperadorTemplateComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem('Usuario'));
        this.NumeroActual = localStorage.getItem('NumberSelected');
        this.ObtenerSalas();
        //console.log(this.user);
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
    OperadorTemplateComponent.prototype.ObtenerSalas = function () {
        var _this = this;
        console.log('Esta son las salas');
        this.salaService.listarSalas()
            .subscribe(function (response) {
            //console.log(response);
            _this.Salas = response;
            console.log(_this.Salas);
        }, function (er) { return console.log(er); });
    };
    OperadorTemplateComponent.prototype.AsignarSipsIax = function () {
        this.Sip_Iax = JSON.parse(localStorage.getItem('Sips_Iaxs'));
    };
    OperadorTemplateComponent.prototype.SeleccionarSip_Iax = function (Sip_Iax) {
        localStorage.setItem('NumberSelected', Sip_Iax);
        this.NumeroActual = Sip_Iax;
    };
    OperadorTemplateComponent.prototype.ChangeWindow = function () {
        if (this.pages == true) {
            this.pages = false;
        }
        else {
            this.pages = true;
        }
    };
    OperadorTemplateComponent.prototype.LateralOpcion = function (page) {
        // 0 = Notificaciones
        // 1 = Mi Agenda
        // 2 = Salas
        // 3 = Mi Pefil (puede cambiar de numeros)
        this.OptionLateral = page;
    };
    OperadorTemplateComponent.prototype.AgregarEventoNotificacion = function () {
        // Metodo donde se asigna de forma aleatorea en el panel de notificaciones
        this.OptionLateral = 0;
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
        this.CambiaHideLateral();
        console.log(this.ParticipantesSala);
    };
    OperadorTemplateComponent.prototype.AgendaLlamada = function (ContactoAgenda) {
        // metodo donde se llama a un contacto mediante la agenda
        this.Llamada.push({ 'nombre': ContactoAgenda['Nombre'], 'id': ContactoAgenda['Id'], 'numero': ContactoAgenda['Numero'], 'Tipo': 'Llamada', 'Estado': 'Inactiva' });
        this.AgregarEventoPanel(ContactoAgenda['Numero'], '15/11/2019', 'false', 'entrante');
    };
    OperadorTemplateComponent.prototype.ContestarLlamada = function (Notificacion) {
        this.Llamada.push({ 'nombre': Notificacion['Nombre'], 'id': Notificacion['Id'], 'numero': Notificacion['Numero'], 'Tipo': 'Llamada', 'Estado': 'Inactiva' });
        this.AgregarEventoPanel(Notificacion['Numero'], '15/11/2019', 'false', 'entrante');
        this.EliminaItemNotificacion(Notificacion['Id']);
    };
    OperadorTemplateComponent.prototype.ColgarLlamada = function (Notificacion) {
        this.AgregarEventoPanel(Notificacion['Numero'], '15/11/2019', 'false', 'perdida');
        this.EliminaItemNotificacion(Notificacion['Id']);
    };
    OperadorTemplateComponent.prototype.DialPadComponent = function () {
        this.modalRef = this.modalService.show(DialPadComponent);
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
    OperadorTemplateComponent.prototype.CambiaHideLateral = function () {
        if (this.HideLateral == true) {
            this.HideLateral = false;
        }
        else {
            this.HideLateral = true;
        }
    };
    OperadorTemplateComponent = __decorate([
        Component({
            selector: 'operador-template',
            templateUrl: './operador-template.component.html',
            animations: [Entrance, Quit, DesktopAnimation, EnterLeave]
        }),
        __metadata("design:paramtypes", [BsModalService,
            FormBuilder,
            SalaService])
    ], OperadorTemplateComponent);
    return OperadorTemplateComponent;
}());
export { OperadorTemplateComponent };
