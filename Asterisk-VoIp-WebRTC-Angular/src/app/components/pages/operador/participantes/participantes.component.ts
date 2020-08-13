import { Component, OnInit, Input } from '@angular/core';
import { ParticipanteSala } from '../../../../../models/participantesSala';
import { faPhoneAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { WebRTCService } from '@services/WebRTC/WebRTC.service';
@Component({
    selector: 'app-participantes',
    templateUrl: './participantes.component.html',
    styleUrls: ['./participantes.component.scss']
})
export class ParticipantesComponent implements OnInit {
    // icons
    public phoneIcon = faPhoneAlt;
    public AddUserIcon = faUserPlus;
    public session: WebRTCService;
    @Input() Participantes: ParticipanteSala[];

    constructor() {}

    ngOnInit(): void {
        this.session = new WebRTCService();
        this.session.sessionEvents();
        console.log('desde el componente', this.Participantes);
    }
    Conferencia(numero) {
        this.session.sipCall(numero);
    }
}
