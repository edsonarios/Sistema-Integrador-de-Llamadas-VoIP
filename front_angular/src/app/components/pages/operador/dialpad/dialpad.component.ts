import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { WebRTCService } from '@services/WebRTC/WebRTC.service';
import { RTCSession } from 'jssip';

@Component({
	selector: 'dialpad',
	templateUrl: './dialpad.component.html'
})
export class DialPadComponent implements OnInit {
	dialNumber: string = '';
	constructor(private router: Router, private modalService: BsModalService) {}

	DialNum(Num) {
		this.dialNumber = this.dialNumber + Num;
	}
	Llamada() {
		window.alert('Llamando al : ' + this.dialNumber);
		this.sipCall(this.dialNumber);
	}
	Limpiar() {
		this.dialNumber = '';
	}

	alert: any;
	session: WebRTCService;
	event: RTCSession;
	call: any;
	arr: Array<RTCSession> = [];
	ngOnInit() {
		this.session = new WebRTCService();
		this.session.sessionEvents();
		this.event = this.session.newRTCSession();
		this.alert = this.session.getMessage();
		this.arr.push(this.event);
	}
	conectar() {
		this.session.connect();
		this.alert = this.session.getMessage();
	}
	desconectar() {
		this.session.disconnect();
		this.alert = this.session.getMessage();
	}

	sipCall(sip) {
		this.session.sipCall(sip);
	}
	endCall() {
		this.session.terminate();
	}
}
