import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { WebRTCService } from '@services/WebRTC/WebRTC.service';
import { SalaService } from '../../../../../services/sala.service';
import { SnotifyService, SnotifyToast, SnotifyPosition, SnotifyStyle } from 'ng-snotify';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AgendaService } from '@services/agenda.service';

import {
    faUsers,
    faEye,
    faUserPlus,
    faHeadset,
    faSignOutAlt,
    faUserSecret,
    faAssistiveListeningSystems,
    faCircle,
    faPhone,
    faVolumeMute,
    faPause,
    faPhoneSlash,
    faVolumeUp,
    faPlay,
    faBroadcastTower,
    faSignInAlt,
    faExternalLinkSquareAlt,
    faLessThanEqual,
    faExchangeAlt
} from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../../../../services/user.service';
import { getLocaleId } from '@angular/common';

@Component({
    selector: 'llamada',
    templateUrl: './llamada.component.html',
    styleUrls: ['./llamada.component.scss']
})
export class LlamadaComponent implements OnInit {
    @Input() Nombre: string;
    @Input() Numero: string;
    @Input() Id: string;
    @Input() Descripcion: string;
    @Input() Tipo: string;
    @Input() Estado: string;
    @Input() Src: string;
    @Input() Dts: string;

    @Output() llamadaClose = new EventEmitter<string>();
    @Output() Participantes = new EventEmitter<string>();

    modalRef: BsModalRef;
    partisActual = [];
    partisExterno = [];
    partis = [];
    numeroActual = localStorage.getItem('NumberSelected');
    public llamada;
    // iconos
    public SalaIcon = faUsers;
    public VerIcon = faEye;
    public AddUserIcon = faUserPlus;
    public HeadsetIcon = faHeadset;
    public SalirIcon = faSignOutAlt;
    public AgenteIcon = faUserSecret;
    public IntervenirIcon = faAssistiveListeningSystems;
    public estadoIcon = faCircle;
    public LlamadaIcon = faPhone;
    public Volumen = faVolumeUp;
    public VolumenIcon = faVolumeMute;
    public PausaIcon = faPause;
    public PlayIcon = faPlay;
    public ColgarIcon = faPhoneSlash;
    public RadioIcon = faBroadcastTower;
    public EntrarIcon = faSignInAlt;
    public InterventIcon = faExchangeAlt;
    //
    infoUsuario: any;
    html = `<span class="btn-block btn-danger well-sm">Never trust not sanitized HTML!!!</span>`;
    compe = '';
    // webrtc
    public estadoAgente = true;
    public estadoAudioLlamada = true;
    public estadoLlamada = true;
    public estadoConferencia = false;
    public estadoParticipantes = false;
    public esRadio = false;

    public session: WebRTCService;
    constructor(
        private router: Router,
        private salaService: SalaService,
        private userService: UserService,
        private snotifyService: SnotifyService,
        private modalService: BsModalService,
        private agendaservice: AgendaService
    ) {}

    ngOnInit() {

        this.compe = this.Numero;
        this.session = new WebRTCService();
        this.session.sessionEvents();
        this.verificaRadio();
        this.ObtenerDatos();
    }

    detalleUsuario(e, numero) {
        console.log(numero);
        //
        this.userService.detalleUsuario(numero).subscribe((response) => {
            console.log(response[0]);
            this.infoUsuario = response[0];
            this.mostrar(this.infoUsuario);
            this.snotifyService.html(
                `<center><b>Información de usuario</b></center>
        <div class="snotifyToast__body"><b>nombre: <small>.....</small>   </b>${this.infoUsuario.nombre} ${this.infoUsuario.apPaterno} ${this.infoUsuario.apMaterno}<br>
        <b>correo:  <small>.....</small>  </b>${this.infoUsuario.correo}<br><b>dirección: <small>.....</small>  </b>${this.infoUsuario.direccion}<br><b>teléfono:   <small>.....</small>  </b>${this.infoUsuario.telefono}</div> `,
                {
                    timeout: 2000,
                    type: 'info',
                    showProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true
                }
            );
        });
    }

    mostrar(info) {
        console.log(info);
    }

    serAgente() {
        if (this.estadoAgente) {
            this.session.sipCall('*201');
            this.estadoAgente = false;
        } else {
            this.session.sipCall('*202');
            this.estadoAgente = true;
        }
    }
    sipCall() {
        this.session.sipCall('*201');
    }
    conferencia() {
        this.session.sipCall('3');
        this.estadoConferencia = !this.estadoConferencia;
    }

    CerrarLlamada(nombre: string, numero: string, idLlamada: string, descripcion: string, tipo: string, estado: string) {
        this.llamada = { Nombre: nombre, Descripcion: descripcion, Id: idLlamada, Tipo: tipo };
        this.llamadaClose.emit(this.llamada);
    }

    VerParticipantes(idSala) {
        // window.alert('Pendiente');
        //
        // this.Participantes.emit('Ver Participantes');
        this.estadoParticipantes = !this.estadoParticipantes;
        this.salaService.GetParticipantesById(idSala).subscribe(
            (res) => {
                this.Participantes.emit(res);
            },
            (err) => {
                console.log(err);
            }
        );
    }
    silenciarLlamada() {
        this.estadoAudioLlamada = !this.estadoAudioLlamada;
    }
    pausarLlamada() {
        this.estadoLlamada = !this.estadoLlamada;
    }
    ColgarLlamada(nombre: string, numero: string, idLlamada: string, descripcion: string, tipo: string, estado: string) {
        // codigo pendiente para colgar la llamada
        this.CerrarLlamada(nombre, numero, idLlamada, descripcion, tipo, estado);
    }
    verificaRadio() {
        const palabra = this.Nombre.substr(0, 5).toLowerCase();
        if (palabra === 'radio') {
            this.esRadio = true;
        } else {
            this.esRadio = false;
        }
    }

    ObtenerDatos() {
        console.log(this.Id);
        this.salaService.GetParticipantesById(this.Id).subscribe(
            (res) => {
                res = res.filter((ope) => ope.numeroSip !== this.numeroActual);
                this.partisActual = res;
            },
            (err) => {
                console.log(err);
            }
        );
        this.agendaservice.listarOperadores().subscribe(
            (res) => {
                res = res.filter((ope) => ope.numeroSip !== this.numeroActual);
                this.partisExterno = res;
            },
            (er) => console.log(er)
        );
    }
    ModalAddParticipante(modal) {
        this.partis = [];
        this.modalService.show(modal);
        this.partisExterno.forEach((it) => {
            if (this.existe(it.numeroSip)) {
                // console.log('No lo añadas');
            } else {
                this.partis.push(it);
            }
        });
    }

    existe(numero) {
        let sw = false;
        this.partisActual.forEach((it) => {
            if (numero === it.numeroSip) {
                sw = true;
            }
        });
        return sw;
    }

    cambioDeSala(obj) {
        const objeto = { id: obj.usuarioId, cambioSalaId: this.Id, numero: obj.numeroSip, cambioSala: this.Nombre };
        console.log(objeto);
        this.salaService.CambioDeSala(objeto).subscribe((response) => {
            console.log(response);
            this.partisActual.push(obj);
            this.partisExterno = this.partisExterno.filter((it) => it.numeroSip !== obj.numeroSip);
            this.partis = this.partis.filter((element) => element.numeroSip !== obj.numeroSip);
        });
    }
<<<<<<< HEAD
=======

    modalinter(modal) {
        this.modalService.show(modal);
    }

    intervencion(option) {
        console.log(option, this.ni);
        switch (option) {
            case 'silen':
                //  555
                this.session.sipCall('555' + this.opesrc);
                console.log('555' + this.Src);
                break;
            case 'od':
                //  556
                this.session.sipCall('556' + this.ni);
                console.log('556' + this.ni);
                break;
            case 'ambos':
                // 557
                this.session.sipCall('557' + this.opesrc);
                console.log('557' + this.Src);
                break;
            default:
                break;
        }
    }

    cambioIntervencion(esto, numero) {
        this.over = esto.toLowerCase();
        this.ni = numero;
    }
>>>>>>> 220b252a13aa4492bab8768b3e391c8cac69db3c
}
