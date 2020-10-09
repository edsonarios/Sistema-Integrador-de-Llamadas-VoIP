import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { User } from 'models/user';
// import { Sala, SalaUser } from '../../../../models/sala';
import { Entrance, Quit, DesktopAnimation, EnterLeave } from 'services/animations';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// import { DialPadComponent } from '../../pages/operador/dialpad/dialpad.component';
import { DialPadComponent } from '@operador/dialpad/dialpad.component';

import { SalaService } from '@services/sala.service';

import { interval, timer } from 'rxjs';

// Fontawesome
import { faMicrophone, faMicrophoneSlash, faSignal, faPlug, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

// Sockets
import { AsteriskConnectionService } from '../../../../services/asterisk-connection.service';
import { Subscription } from 'rxjs';

import { WebRTCService } from '@services/WebRTC/WebRTC.service';
import { UA } from 'jssip';
import { RTCSession } from 'jssip/lib/RTCSession';
import { WebsocketService } from '../../../../services/websocket.service';
import { Socket } from 'ngx-socket-io';
import * as io from 'socket.io-client';
import { GLOBAL } from '@services/global';
import { EstadoAsterisk, UsuarioEstado } from '../../../../models/estadoAsterisk';
import { ParticipanteSala } from '../../../../models/participantesSala';
import { SalaUser } from '@models/apisInterface';
import { UserService } from '../../../../services/user.service';
// import { SalaUser } from '@models/sala';

@Component({
    selector: 'operador-template',
    templateUrl: './operador-template.component.html',
    animations: [Entrance, Quit, DesktopAnimation, EnterLeave]
})
export class OperadorTemplateComponent implements OnInit, OnDestroy {
    // variables para manejar el comportamiento del lateral derecho
    public Sala = true;
    public Agenda = false;
    public AddFriend = false;
    public Dialpad = false;
    public panel = false;
    public Llamada = [];
    PaEnviar: any;
    public numSrc;
    public nomSrc;
    public numDts;
    public nomDts;
    public textoPadre;
    public rtc: WebRTCService;
    public ua: UA;
    public remote: RTCSession;
    public mostrarParticipantes = false;
    public nombreSala = 'DEFAULT';
    // variables para guardar los iconos
    faSenal = faSignal;
    faMicro = faMicrophone;
    faMicroActive = faMicrophoneSlash;
    faSenalAsterisk = faPlug;
    numeroIcon = faMobileAlt;
    // asteriskIcon= ang;
    // colores en variables
    Connection = '#22bb33';
    connectionAsterisk = 'black';
    Microphone = 'black';
    noConnection = '#d9534f';
    lowConnection = '#f0ad4e';

    public Salas = [];
    public Notificaciones = [];
    public Panel = [];
    public ParticipantesSala = [];
    public ParticipantesSala2: ParticipanteSala[] = [];

    public Hide = true;
    public HideLateral = true;
    public OptionLateral = 0;

    public pages = false;

    user: User;
    public userId;
    public salaId: SalaUser;
    public NumeroActual;
    public HidePanel = false;

    public Sip_Iax = [[], []];
    public arrayAgendaEstados = ['desconectado', 'desconectado', 'desconectado'];
    // Socket
    estadoSubscription: Subscription;
    estado: any = [];
    public Conectados = [];
    public socketAgenda2: UsuarioEstado;
    ASTERISK;
    public dataNull: UsuarioEstado = {
        estado: 'none',
        evento: 'none',
        numero: '0'
    };
    public socketAgendaNumero = '';
    public socketAgendaEstado = '';

    public urlSocket: string;
    public sockets;
    public hide = 'false';
    public VectorPaneles = [];
    public panelEstado = false;
    modalRef: BsModalRef;
    // variables para llamadas
    public session: WebRTCService;

    opeSrc = { nombre: 'Numero', apPaterno: 'Externo' };
    opeDts = { nombre: 'Numero', apPaterno: 'Externo' };
    over = '';
    ni = '';
    swInter = false;
    numeroActual = localStorage.getItem('NumberSelected');

    detalle;
    constructor(
        private modalService: BsModalService,
        private formBuilder: FormBuilder,
        public salaService: SalaService,
        public estadoService: AsteriskConnectionService,
        public wsService: WebsocketService,
        private socket: Socket,
        private userService: UserService
    ) {
        this.sockets = io(GLOBAL.urlSocket);
        console.log(this.sockets);

        this.ParticipantesSala = [
            {
                Id: '1',
                Nombre: 'Nelson Richard',
                ApPaterno: 'Cori',
                ApMaterno: 'Sirpa',
                Sip: [
                    {
                        Numero: '3001',
                        Alias: '3001',
                        context: 'default'
                    },
                    {
                        Numero: '3002',
                        Alias: '3002',
                        context: 'default'
                    }
                ],
                Iax: [
                    {
                        Numero: '3003',
                        Alias: '3003',
                        context: 'default'
                    }
                ]
            },
            {
                Id: '2',
                Nombre: 'Edson',
                ApPaterno: 'Añawaya',
                ApMaterno: 'Rios',
                Sip: [
                    {
                        Numero: '3003',
                        Alias: '3003',
                        context: 'default'
                    },
                    {
                        Numero: '3004',
                        Alias: '3004',
                        context: 'default'
                    }
                ],
                Iax: [
                    {
                        Numero: '3005',
                        Alias: '3005',
                        context: 'default'
                    },
                    {
                        Numero: '3006',
                        Alias: '3006',
                        context: 'default'
                    }
                ]
            }
        ];

        this.AsignarSipsIax();
    }
    ngOnInit() {
        this.session = new WebRTCService();
        this.session.sessionEvents();
        this.numSrc = '';
        this.nomSrc = '';
        this.numDts = '';
        this.nomDts = '';
        localStorage.setItem('PanelHide', 'false');
        localStorage.setItem('estadoUsers', JSON.stringify(this.arrayAgendaEstados));
        this.user = JSON.parse(localStorage.getItem('Usuario'));
        this.userId = this.user.usuarioId;
        this.NumeroActual = localStorage.getItem('NumberSelected');
        this.rtc = new WebRTCService();
        console.log(this.rtc);
        this.rtc.sessionEvents();
        this.ua = this.rtc.getUA();
        this.ua.on('sipEvent', (e) => {
            console.log(e);
        });
        this.ua.on('newRTCSession', (data) => {
            let session = data.session;
            console.log('[ NEW RTC SESSION ]', data);
            console.log('[ NEW RTC DATA ]', data.session.connection);
            if (data.originator === 'local') {
                console.log('LLAMADA LOCAL');
            }
            if (data.originator === 'remote') {
                console.log('LLAMADA REMOTA');
                // await this.sound.play('ringing');
                // @ts-ignore
                let { _user } = data.request.from.uri;
                console.log(_user);
                this.AgregarEventoNotificacionRTC(_user, _user, _user);
                this.remote = session;
            }
        });
        this.ObtenerSalas();

        this.estadoService.getResponse('asterisk').subscribe((msg: EstadoAsterisk) => {
            this.ASTERISK = msg.evento;
            console.log('ASTERISK', msg.evento);
            this.cambioAsterisk();
        });
        // usuarioEstado2
        this.verificar();
        setInterval(() => {
            this.cambioSenal();
            // console.log('señal de internet: ', navigator.onLine);
        }, 6000);
        // ***************************Socket para ver el estado de los usuarios de la Agenda*********************************
        this.estadoService.estadoUsuariosAgenda('estadoUsuarioLlamadas');
        this.estadoService.getResponse('usuarioEstado2').subscribe((msg: UsuarioEstado) => {
            this.Conectados.push(msg.numero);
            localStorage.setItem('socketAgenda', JSON.stringify(this.Conectados));
        });
        this.estadoService.getResponse('usuarioEstado').subscribe((msg: UsuarioEstado) => {
            this.dataNull = new UsuarioEstado(msg);
            // console.log('Socket Activo!!!!', this.dataNull);
            this.socketAgendaNumero = this.dataNull.numero;
            this.socketAgendaEstado = this.dataNull.estado;
            this.actualizarStorage(this.socketAgendaNumero, this.socketAgendaEstado);
        });
        // console.log('[CONECTADOS]', JSON.stringify(this.Conectados));
        // console.log('[OPERADOR] lista de conectados', this.Conectados);
        // console.log('[OPERADOR] datos en el storage', localStorage.getItem('socketAgenda'));
        this.salaService.getSalaporUsuario(this.userId).subscribe(
            (response) => {
                console.log('[OPERADOR] respuesta', response);
                this.salaId = response[0];
                console.log('[OPERADOR] salaid: ', this.salaId.nombreSala);
                this.nombreSala = this.salaId.nombreSala;
            },
            (er) => console.log(er)
        );
    }
    ngOnDestroy() {
        this.estadoSubscription.unsubscribe();
    }

    ngAfterViewInit() {
        // estado de los botones en tiempo real
        this.startRealtime();
    }
    async startRealtime() {
        this.socket.on('Llamadas', (payload) => {
            console.log(payload);
            this.BusquedaExistente(payload);
        });
    }
    //panel begin
    BusquedaExistente(Vector) {
        if (this.BusquedaExistentenEventoPanel(Vector)) {
            // si existe actualiza el dato
            this.ActualizarEventoPanel(Vector);
        } else {
            // si no existe solo lo adiciona en su ultimo estado
            this.AgregarEventoPanelEstado(Vector);
        }
        this.EliminaHangups(this.VectorPaneles);
    }
    EliminaHangups(VectorPaneles) {
        let aux = [];
        let long = 0;
        for (let i = 0; i < VectorPaneles.length; i++) {
            if (VectorPaneles[i]['evento'] != 'Hangup') {
                aux[long] = VectorPaneles[i];
                long = long + 1;
            }
        }
        this.VectorPaneles = aux;
    }
    BusquedaExistentenEventoPanel(Vector) {
        // recorre todo el vecto en busqueda de los datos repetidos
        for (let j = 0; j < this.VectorPaneles.length; j++) {
            if (
                (this.VectorPaneles[j]['numero'] == Vector['numero'] && this.VectorPaneles[j]['extension'] == Vector['extension']) ||
                (this.VectorPaneles[j]['extension'] == Vector['numero'] && this.VectorPaneles[j]['numero'] == Vector['extension'])
            ) {
                return true;
            } else {
            }
        }
        return false;
    }
    AgregarEventoPanelEstado(Payload) {
        this.VectorPaneles.push(Payload);
    }
    ActualizarEventoPanel(Vector) {
        const Long = this.VectorPaneles.length;
        this.VectorPaneles[Long - 1] = Vector;
    }
    Opcion1() {
        console.log(this.VectorPaneles);
    }
    Opcion2() {}
    Opcion3() {}
    intervencion(option) {
        console.log(option, this.ni);
        switch (option) {
            case 'silen':
                //  555
                this.session.sipCall('555' + this.numSrc);
                console.log('555' + this.numSrc);
                break;
            case 'od':
                //  556
                this.session.sipCall('556' + this.ni);
                console.log('556' + this.ni);
                break;
            case 'ambos':
                // 557
                this.session.sipCall('557' + this.numSrc);
                console.log('557' + this.numSrc);
                break;
            default:
                break;
        }
    }

    cambioIntervencion(esto, numero) {
        this.over = esto.toLowerCase();
        this.ni = numero;
    }

    validacionOperadores(n): boolean {
        if (this.numeroActual === n.extension || this.numeroActual === n.numero) {
            return true;
        } else {
            return false;
        }
    }

    enviarIntervencion(n) {
        console.log();
        var detallesllamada = { extension: n.extension, numero: n.numero };
        console.log('interviniendo...');
        this.numSrc = detallesllamada.extension;
        this.numDts = detallesllamada.numero;

        if (this.numeroActual === detallesllamada.extension || this.numeroActual === detallesllamada.numero) {
            console.log('NO PUEDES INTERVENIR ESTA LLAMADA');
        } else {
            this.numSrc = detallesllamada.extension;
            this.numDts = detallesllamada.numero;
            console.log(this.numSrc);
            console.log(this.numDts);
            this.userService.detalleUsuario(this.numSrc).subscribe((response) => {
                if (response[0] === undefined) {
                    console.log(' EL NUMERO ES EXTERNO');
                } else {
                    console.log(response[0]);
                    this.opeSrc = response[0];
                }
            });
            this.userService.detalleUsuario(this.numDts).subscribe((response) => {
                if (response[0] === undefined) {
                    console.log(' EL NUMERO ES EXTERNO');
                } else {
                    console.log(response);
                    this.opeDts = response[0];
                }
            });
            console.log('origen', this.numSrc);
            console.log('destino', this.numDts);
        }

        this.detalle = { nomSrc: this.opeSrc, numSrc: this.numSrc, nomDts: this.opeDts, numDts: this.numDts };
        console.log(this.detalle);
        //  this.IntervencionLlamada.emit(this.detalle);
    }

    modalinter(modal, n) {
        // this.IntervencionLlamada.emit("Mensaje desde el componente hijo");
        // if (this.numeroActual === n.extension || this.numeroActual === n.numero) {
        //     console.log('NO PUEDES INTERVENIR ESTA LLAMADA');
        // } else {
        //     this.numSrc = n.extension;
        //     this.numDts = n.numero;
        //     console.log(this.numSrc);
        //     console.log(this.numDts);
        //     this.userService.detalleUsuario(this.numSrc).subscribe((response) => {
        //         if (response[0] === undefined) {
        //             console.log(' EL NUMERO ES EXTERNO');
        //         } else {
        //             console.log(response[0]);
        //             this.opeSrc = response[0];
        //         }
        //     });
        //     this.userService.detalleUsuario(this.numDts).subscribe((response) => {
        //         if (response[0] === undefined) {
        //             console.log(' EL NUMERO ES EXTERNO');
        //         } else {
        //             console.log(response);
        //             this.opeDts = response[0];
        //         }
        //     });
        //     this.modalService.show(modal);
        //     console.log('origen', this.numSrc);
        //     console.log('destino', this.numDts);
        // }
    }
    //panel ends
    LoaderPage(funtion) {
        if (funtion == 'page') {
            this.Hide = false;
            this.hide = 'true';
        } else {
            if (funtion == 'operational') {
                this.Hide = true;
                this.hide = 'false';
            }
        }
    }
    LoaderPanel() {
        if (this.panel == false) {
            localStorage.setItem('PanelHide', 'true');
            this.panel = true;
            this.hide = localStorage.getItem('PanelHide');
        } else {
            this.panel = false;
            localStorage.setItem('PanelHide', 'false');
            this.hide = localStorage.getItem('PanelHide');
        }
    }
    ObtenerSalas() {
        console.log('Esta son las salas');
        this.salaService.listarSalas().subscribe(
            (response) => {
                for (let i = 0; i < response.length; i++) {
                    if (response[i]['nombreSala'] != 'default') {
                        this.Salas.push(response[i]);
                    }
                }

                console.log(this.Salas);
            },
            (er) => console.log(er)
        );
    }
    AsignarSipsIax() {
        this.Sip_Iax = JSON.parse(localStorage.getItem('Sips_Iaxs'));
    }
    SeleccionarSip_Iax(Sip_Iax) {
        localStorage.setItem('NumberSelected', Sip_Iax);
        this.NumeroActual = Sip_Iax;
        this.rtc.disconnect();
        this.rtc = new WebRTCService();
        console.log(this.rtc);
    }
    ChangeWindow(page) {
        switch (page) {
            case 'Dashboard':
                this.pages = false;
                break;
            case 'Historial':
                this.pages = true;
                break;
            case 'Grabaciones':
                this.pages = true;
                break;
            case 'Tracking':
                this.pages = true;
                break;

            default:
                break;
        }
    }

    LateralOpcion(page) {
        // 0 = Notificaciones
        // 1 = Mi Agenda
        // 2 = Salas
        // 3 = Mi Pefil (puede cambiar de numeros)
        this.OptionLateral = page;
    }

    AgregarEventoNotificacion() {
        // Metodo donde se asigna de forma aleatorea en el panel de notificaciones
        this.OptionLateral = 0;
        var numero = Math.round(Math.random() * (3020 - 3000) + 3000);
        var id = Math.round(Math.random() * (20 - 11) + 11);
        this.Notificaciones.push({ nombre: 'Alias', numero: numero, estado: 'entrante', id: id });
        this.Ordenar();
    }
    Ordenar() {
        console.log('Entra');
        let aux = [];
        let long = this.Notificaciones.length - 1;
        for (let i = 0; i < this.Notificaciones.length; i++) {
            //console.log('Long:' + long);
            //console.log(this.Notificaciones[long]);
            aux.push(this.Notificaciones[long]);
            long = long - 1;
        }
        this.Notificaciones = aux;
    }

    AgregarEventoNotificacionRTC(id, number, nombre) {
        this.OptionLateral = 0;
        this.Notificaciones.push({ id, numero: number, estado: 'entrante', nombre });
    }

    AgregarEventoPanel(numero, fecha, duracion, tipo) {
        //metodo en el que agregamos una nueva tupla en el panel de estados

        var horaNow = this.ObtenerTiempo();
        this.Panel.push({ tipo: tipo, Numero: numero, fecha: fecha, Hora: horaNow, tiempo: duracion });
    }

    RegistraSala(Sala) {
        // Metodo del escritorio donde se crea una ventana y se elimina de la salas

        if (Sala['nombre'].toLowerCase().includes('radio')) {
            this.Llamada.push({
                nombre: Sala['nombre'],
                descripcion: Sala['descripcion'],
                id: Sala['id'],
                Tipo: 'Radio',
                Estado: 'Activa'
            });
        } else {
            this.Llamada.push({
                nombre: Sala['nombre'],
                descripcion: Sala['descripcion'],
                id: Sala['id'],
                Tipo: 'Sala',
                Estado: 'Activa'
            });
        }

        this.EliminaItemSalas(Sala['id']);
    }
    CerrarLlamada(CallInfo) {
        // Metodo en el escritorio para cerrar la llamada del escritorio
        console.log('La llamada');
        console.log(CallInfo);

        this.EliminaItemLlamadas(CallInfo['Id']);

        //Termina la sesion !
        // this.rtc.terminate();
        if (CallInfo['Tipo'] == 'Sala' || CallInfo['Tipo'] == 'Radio') {
            this.Salas.push({
                nombreSala: CallInfo['Nombre'],
                id: CallInfo['Id'],
                descripcion: CallInfo['Descripcion']
            });
            console.log('Las salas:');
            console.log(this.Salas);
        } else {
            //Codigo referido para llamadas
        }
    }
    VerParticipantes(event: ParticipanteSala[]) {
        //console.log('Llega el evento y debe de cambiar los componentes')
        this.CambiaHideLateral();
        this.mostrarParticipantes = !this.mostrarParticipantes;
        // console.log('participantes', this.ParticipantesSala);
        this.ParticipantesSala2 = event;
        // console.log('participantes', this.ParticipantesSala2);
    }

    AgendaLlamada(ContactoAgenda) {
        // metodo donde se llama a un contacto mediante la agenda

        this.Llamada.push({
            nombre: ContactoAgenda['Nombre'],
            id: ContactoAgenda['Id'],
            numero: ContactoAgenda['Numero'],
            Tipo: 'Llamada',
            Estado: 'Activa'
        });
        this.AgregarEventoPanel(ContactoAgenda['Numero'], '15/11/2019', 'false', 'entrante');
    }
    ContestarLlamada(Notificacion) {
        this.Llamada.push({
            nombre: Notificacion['Nombre'],
            id: Notificacion['Id'],
            numero: Notificacion['Numero'],
            Tipo: 'Llamada',
            Estado: 'Activa'
        });
        this.AgregarEventoPanel(Notificacion['Numero'], '15/11/2019', 'false', 'entrante');
        this.EliminaItemNotificacion(Notificacion['Id']);
        this.rtc.setSession(this.remote);
        this.rtc.remoteCall();
    }
    ColgarLlamada(Notificacion) {
        this.AgregarEventoPanel(Notificacion['Numero'], '15/11/2019', 'false', 'perdida');
        this.EliminaItemNotificacion(Notificacion['Id']);
    }

    DialPadComponent() {
        this.modalRef = this.modalService.show(DialPadComponent);
    }
    DialpadCall(event) {
        this.Llamada.push({
            nombre: event['nombre'],
            id: '0',
            numero: event['SIP'],
            Tipo: 'Llamada',
            Estado: 'Activa'
        });
    }
    EliminaItemLlamadas(id_llamada) {
        let aux = [];
        for (var i = 0; i < this.Llamada.length; i++) {
            if (id_llamada != this.Llamada[i]['id']) {
                aux.push(this.Llamada[i]);
            }
        }
        this.Llamada = aux;
    }
    EliminaItemSalas(id_Salas) {
        let aux = [];
        for (var i = 0; i < this.Salas.length; i++) {
            if (id_Salas != this.Salas[i]['id']) {
                aux.push(this.Salas[i]);
            }
        }
        this.Salas = aux;
    }
    EliminaItemNotificacion(id_Notificacion) {
        let aux = [];
        for (var i = 0; i < this.Notificaciones.length; i++) {
            if (id_Notificacion != this.Notificaciones[i]['id']) {
                aux.push(this.Notificaciones[i]);
            }
        }
        this.Notificaciones = aux;
    }
    ConvertirTiempo(tiempo) {
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
    }
    MicrophoneOption() {
        // Aqui viene las opciones para el microfono del operador
    }
    AudioOption() {
        // Aqui viene las opciones para el audio del operador
    }
    NetworkSignalOption() {
        // Aqui viene las opciones para la red del operador
    }
    Busqueda() {
        //Aqui viene los metodos y/o contenido de la busqueda
    }
    ObtenerTiempo() {
        //Aqui viene los metodos y/o contenido de la busqueda
        var date = new Date();
        //console.log('El dato es :'+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds());
        return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    }
    CambiaHideLateral() {
        if (this.HideLateral == true) {
            this.HideLateral = false;
        } else {
            this.HideLateral = true;
        }
    }

    // funciones para ocultar y mostrar los elementos del lateral derecho "Salas"
    salaActive() {
        this.Sala = true;
        this.Agenda = false;
        this.Dialpad = false;
        this.AddFriend = false;
    }
    agendaActive() {
        this.Agenda = true;
        this.Sala = false;
        this.Dialpad = false;
        this.AddFriend = false;
    }
    addFriendActive() {
        this.Agenda = false;
        this.Sala = false;
        this.Dialpad = false;
        this.AddFriend = true;
    }
    dialpadActive() {
        this.Dialpad = true;
        this.Agenda = false;
        this.Sala = false;
        this.AddFriend = false;
    }
    // funciones lateral izquierdo inferior
    muteMicrophone() {
        if (this.faMicro === faMicrophone) {
            this.faMicro = this.faMicroActive;
            this.Microphone = this.noConnection;
            this.rtc.mute();
        } else {
            this.faMicro = faMicrophone;
            this.Microphone = 'black';
            this.rtc.unmute();
        }
    }
    cambioSenal() {
        if (!navigator.onLine) {
            this.Connection = this.noConnection;
        } else {
            this.Connection = '#22bb33';
        }
    }
    cambioAsterisk() {
        if (this.ASTERISK) {
            this.connectionAsterisk = this.Connection;
        } else {
            this.connectionAsterisk = this.noConnection;
        }
    }
    verificar() {
        this.estadoService.accionAsterisk('estado');
    }

    // ********AGENDA**********
    actualizarStorage(num: string, estado: string) {
        const numero = num.split('/')[1];
        if (!this.Conectados.includes(numero)) {
            if (estado === 'conectado') {
                this.Conectados.push(numero);
                localStorage.setItem('socketAgenda', JSON.stringify(this.Conectados));
            }
        } else {
            if (estado !== 'conectado') {
                this.Conectados.splice(this.Conectados.indexOf(numero));
                localStorage.setItem('socketAgenda', JSON.stringify(this.Conectados));
            }
        }
    }

    mostrarData(mensaje) {
        this.PaEnviar = mensaje;
        this.nomSrc = mensaje.nomSrc.nombre + mensaje.nomSrc.apPaterno;
        this.nomDts = mensaje.nomDts.nombre + mensaje.nomDts.apPaterno;
        this.numDts = mensaje.numDts;
        this.numSrc = mensaje.numSrc;
        console.log(mensaje);
        console.log(mensaje.nomSrc.nombre, mensaje.nomSrc.apPaterno);
        console.log(mensaje.nomDts.nombre, mensaje.nomDts.apPaterno);
    }
}
