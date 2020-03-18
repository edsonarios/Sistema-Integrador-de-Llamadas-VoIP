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

	mute: boolean = false;
	hold: boolean = false;
	ptt: boolean = false;
	DialNum(Num) {
		this.dialNumber = this.dialNumber + Num;
	}
	Llamada() {
		this.sipCall(this.dialNumber);
		this.Limpiar();
	}
	Limpiar() {
		this.dialNumber = '';
	}

	alert: any;
	session: any;
	event: RTCSession;
	call: any;
	arr: Array<RTCSession> = [];

	ngOnInit() {
		this.session = new WebRTCService();
		this.session.sessionEvents();
		this.event = this.session.newRTCSession();
		this.alert = this.session.getMessage();
		this.arr.push(this.event);
		this.mute = false;
		this.hold = false;
		this.ptt = false;
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

	callMute() {
		this.session.mute();
		this.mute = true;
	}
	callUnmute() {
		this.session.unmute();
		this.mute = false;
	}

	callHold() {
		this.session.hold();
		this.hold = true;
	}
	callUnHold() {
		this.session.unhold();
		this.hold = false;
	}
	remote() {
		this.session.remoteCall();
	}
	pttOn() {
		this.session.pttOn();
		this.ptt = true;
	}

	pttOff() {
		this.session.pttOff();
		this.ptt = false;
	}
}
