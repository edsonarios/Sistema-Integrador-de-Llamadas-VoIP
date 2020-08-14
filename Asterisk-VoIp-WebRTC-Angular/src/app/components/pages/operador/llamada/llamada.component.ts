import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { WebRTCService } from '@services/WebRTC/WebRTC.service';
import { SalaService } from '../../../../../services/sala.service';
import { SnotifyService, SnotifyToast, SnotifyPosition, SnotifyStyle } from 'ng-snotify';

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
    faTshirt
} from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../../../../services/user.service';

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

    @Output() llamadaClose = new EventEmitter<string>();
    @Output() Participantes = new EventEmitter<string>();

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
    public VolumenIcon = faVolumeMute;
    public PausaIcon = faPause;
    public ColgarIcon = faPhoneSlash;

    //
    infoUsuario: any;
    compe ="";
    // webrtc
    public session: WebRTCService;
    constructor(private router: Router, private salaService: SalaService, private userService: UserService, private snotifyService: SnotifyService) {}

    ngOnInit() {
        this.compe = this.Numero;
        console.log(this.Nombre, this.Numero, this.Id, this.Descripcion, this.Tipo, this.Estado );
        this.session = new WebRTCService();
        this.session.sessionEvents();
    }


    detalleUsuario(e, numero){
        console.log(this.Numero);
       //
       this.userService.detalleUsuario(this.Numero).subscribe( response =>{
        console.log(response[0]);
        this.infoUsuario = response[0];
        this.mostrar(this.infoUsuario);
        this.snotifyService.html(`<center><b>Información de usuario</b></center>
        <div class="snotifyToast__body"><b>nombre: <small>.....</small>   </b>${this.infoUsuario.nombre} ${this.infoUsuario.apPaterno} ${this.infoUsuario.apMaterno}<br>
        <b>correo:  <small>.....</small>  </b>${this.infoUsuario.correo}<br><b>dirección: <small>.....</small>  </b>${this.infoUsuario.direccion}<br><b>teléfono:   <small>.....</small>  </b>${this.infoUsuario.telefono}</div> `, {
        timeout: 2000,
        type: "info",
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        });
    });   
    }

    mostrar(info){
        console.log(info);
    }


    sipCall() {
        this.session.sipCall('*201');
    }
    CerrarLlamada(nombre: string, numero: string, id_llamada: string, descripcion: string, tipo: string, estado: string) {
        if (tipo == 'Sala') {
            this.llamada = { Nombre: nombre, Descripcion: descripcion, Id: id_llamada, Tipo: tipo };
            this.llamadaClose.emit(this.llamada);
        }
        if (tipo == 'Radio') {
        }
        if (tipo == 'Llamada') {
        }
    }

    VerParticipantes(idSala) {
        // window.alert('Pendiente');
        //
        //this.Participantes.emit('Ver Participantes');
        this.salaService.GetParticipantesById(idSala).subscribe(
            (res) => {
                this.Participantes.emit(res);
            },
            (err) => {
                console.log(err);
            }
        );
    }
}
