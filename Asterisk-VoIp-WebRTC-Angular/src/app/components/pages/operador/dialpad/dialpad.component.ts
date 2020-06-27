import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { WebRTCService } from '@services/WebRTC/WebRTC.service';

import { SnotifyService } from 'ng-snotify';

@Component({
	selector: 'dialpad',
	templateUrl: './dialpad.component.html'
})
export class DialPadComponent implements OnInit {
	constructor(private snotifyService: SnotifyService) {}

	public symbols: String[] = '123456789*0#'.split('');

	public dialNumber: String = '';

	public phone: boolean = false;

	mute: boolean = false;
	hold: boolean = false;
	ptt: boolean = false;

	setValue(num) {
		this.dialNumber += num;
	}

	Llamada() {
		this.sipCall(this.dialNumber);
	}
	Limpiar() {
		this.dialNumber = '';
	}

	alert: any;
	session: WebRTCService;
	event: any;
	call: any;
	arr: Array<any> = [];

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
		this.phone = true;
		this.session.sipCall(sip);
		this.snotifyService.success('LLAMADA INICIADA', { showProgressBar: false });
	}
	endCall() {
		this.phone = false;
		this.session.terminate();
		this.snotifyService.error('LLAMADA TERMINADA', { showProgressBar: false });
	}

	callMute() {
		this.session.mute();
		this.mute = true;
	}
	callUnmute() {
		this.session.unmute();
		this.mute = false;
	}
}
