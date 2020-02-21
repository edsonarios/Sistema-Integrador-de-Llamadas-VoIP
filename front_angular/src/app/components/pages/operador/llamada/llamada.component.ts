import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { WebRTCService } from '@services/WebRTC/WebRTC.service';
import { RTCSession } from 'jssip';

@Component({
	selector: 'llamada',
	templateUrl: './llamada.component.html'
})
export class LlamadaComponent implements OnInit {
	@Input() Nombre: string;
	@Input() Numero: string;
	@Input() Tipo: string;
	@Input() Id: string;
	@Input() Estado: string;
	@Input() Session: any;

	@Output() llamadaClose = new EventEmitter<string>();
	@Output() Participantes = new EventEmitter<string>();

	public llamada;

	session: WebRTCService;

	constructor(private router: Router) {}

	ngOnInit() {
		this.session = new WebRTCService();
	}

	CerrarLlamada(nombre: string, numero: string, id_llamada: string, tipo: string) {
		this.llamada = { Nombre: nombre, Numero: numero, Id: id_llamada, Tipo: tipo };
	}

	VerParticipantes() {
		this.Participantes.emit('Ver Participantes');
	}
}
