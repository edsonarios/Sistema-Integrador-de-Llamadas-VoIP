import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { WebRTCService } from '@services/WebRTC/WebRTC.service';
import { SalaService } from '../../../../../services/sala.service';
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
    faPhoneSlash
} from '@fortawesome/free-solid-svg-icons';

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
    // webrtc
    public session: WebRTCService;
    constructor(private router: Router, private salaService: SalaService) {}

    ngOnInit() {
        this.session = new WebRTCService();
        this.session.sessionEvents();
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
