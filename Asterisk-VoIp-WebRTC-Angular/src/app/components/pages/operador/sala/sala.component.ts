import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { WebRTCService } from '@services/WebRTC/WebRTC.service';
import { RTCSession } from 'jssip';

@Component({
  selector: 'Sala',
  templateUrl: './sala.component.html',
})
export class SalaComponent implements OnInit {
  @Input() Nombre: string;
  @Input() Descripcion: string;
  @Input() Id: string;

  public Numero;
  public sala;

  @Output() DatoSala = new EventEmitter<string>();
  constructor(private router: Router) {}

  //session: WebRTCService;
  //event: RTCSession;
  ngOnInit() {
    //this.session = new WebRTCService();
  }
  EntrarSala(Nombre: string, id_sala: string, desc: string) {
    this.sala = { nombre: Nombre, id: id_sala, descripcion: desc };
    this.DatoSala.emit(this.sala);
    // Llamando al SIP 1 😂
    //this.sipCall('7001');
    console.log(this.sala);
  }

  sipCall(sip) {
    //this.session.sipCall(sip);
  }
}
