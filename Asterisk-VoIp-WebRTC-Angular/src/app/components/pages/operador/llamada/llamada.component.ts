import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { WebRTCService } from '@services/WebRTC/WebRTC.service';
import { faUsers, faEye, faUserPlus, faHeadset, faSignOutAlt, faUserSecret, faAssistiveListeningSystems } from '@fortawesome/free-solid-svg-icons';

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
    public SalaIcon = faUsers;
    public VerIcon = faEye;
    public AddUserIcon = faUserPlus;
    public HeadsetIcon = faHeadset;
    public SalirIcon = faSignOutAlt;
    public AgenteIcon = faUserSecret;
    public IntervenirIcon = faAssistiveListeningSystems;

    constructor(private router: Router) {}

    ngOnInit() {}

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

    VerParticipantes() {
        window.alert('Pendiente');
        //
        //this.Participantes.emit('Ver Participantes');
    }
}
