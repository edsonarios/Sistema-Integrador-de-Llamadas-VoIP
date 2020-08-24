import { Component, OnInit, Input } from '@angular/core';
import { ParticipanteSala } from '../../../../../models/participantesSala';
import { faPhoneAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { WebRTCService } from '@services/WebRTC/WebRTC.service';
import { SalaService } from '@services/sala.service';
import { stringify } from 'querystring';

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

    user = JSON.parse(localStorage.getItem('Usuario'));

    constructor(private salaService: SalaService) {}

    ngOnInit(): void {
        this.session = new WebRTCService();
        this.session.sessionEvents();
       
        //filtrar el operador actual participantes
        this.filtrarOperador(this.Participantes, this.user);
        // console.log('desde el componente', this.Participantes);
    }

    filtrarOperador(partis, user){
        //Quita el operador actual de los Participantes
        let devol = [];
       partis.forEach(it => {
           if (it.id != user.usuarioId) {
                devol.push(it);           
           }
       });
       this.Participantes = devol;
    }

    // Conferencia(numero) {
    //     this.session.sipCall(numero);
    // }
    
    AddToSala(participante){
        console.log(this.user);
        this.salaService.CambioDeSala(participante).subscribe(
            response => {
                console.log(response);
            }
        );
    }
}
