import { Injectable } from '@angular/core';
import { SoundPlayer } from './SoundPlayer';
import { config } from './config';
import { RTCConfig } from './RegisterRTC';
import {
	WebSocketInterface,
	UA,
	RTCSession,
	UserAgentNewRtcSessionEvent,
	UserAgentCallOptions,
	EventHandler
} from 'jssip';

@Injectable()
export class WebRTCService {
	public sound: SoundPlayer = new SoundPlayer();
	public settings: RTCConfig;
	public socket: WebSocketInterface;
	public ua: UA;
	public msg: string;
	public status: boolean = false; // Verifica si estamos conectados
	public audioLocal: HTMLAudioElement = <HTMLAudioElement>document.getElementById('audio-local');
	public audioRemote: HTMLAudioElement = <HTMLAudioElement>document.getElementById('audio-remote');

	public session: RTCSession;
	public data: any;
	static instace;
	constructor() {
		if (!!WebRTCService.instace) {
			return WebRTCService.instace;
		}
		WebRTCService.instace = this;

		this.settings = new RTCConfig('7010', '7010', config.HOST);
		this.socket = new WebSocketInterface(`wss://${config.HOST}:8089/ws`);
		this.createSession();
		this.connect();
	}

	createSession() {
		this.ua = new UA(this.settings.createConfig(this.socket));
	}

	connect() {
		if (!this.ua.isRegistered()) {
			this.ua.start();
			this.ua.register();
		}
	}

	disconnect() {
		if (this.ua.isRegistered()) {
			this.ua.stop();
			this.ua.unregister();
		}
	}

	sessionEvents() {
		this.ua.on('connected', e => {
			console.log('[ CONECTADO ]', e);
			this.msg = 'CONECTADO';
		});
		this.ua.on('disconnected', e => {
			console.log('[ DESCONECTADO ]', e);
			this.msg = 'DESCONECTADO';
		});
		this.ua.on('registered', e => {
			console.log('[ REGISTRADO ]', e);
			this.msg = 'REGISTRADO';
		});
		this.ua.on('unregistered', e => {
			console.log('[ NO REGISTRADO ]', e);
			this.msg = 'NO REGISTRADO';
		});
		this.ua.on('registrationFailed', e => {
			console.log('[ NO REGISTRADO FALLANDO ]', e);
			this.msg = 'NO REGISTRADO FALLANDO';
		});
		return this.msg;
	}

	newRTCSession(): RTCSession {
		this.ua.on('newRTCSession', async (data: UserAgentNewRtcSessionEvent) => {
			this.session = data.session;
			console.log('[ NEW RTC SESSION ]', data);
			console.log('[ NEW RTC DATA ]', data.session.connection);
			if (data.originator === 'local') {
				console.log('LLAMADA LOCAL');
			}
			if (data.originator === 'remote') {
				console.log('LLAMADA REMOTA');
				await this.sound.play('ringing');
				console.log(data.request.ruri);
			}
		});
		return this.session;
	}

	terminate() {
		try {
			this.session.terminate();
		} catch (error) {
			console.warn(error);
		}
	}

	mute() {
		try {
			this.session.mute();
		} catch (error) {
			console.warn(error);
		}
	}
	unmute() {
		try {
			this.session.unmute();
		} catch (error) {
			console.warn(error);
		}
	}
	hold() {
		try {
			this.session.hold();
		} catch (error) {
			console.warn(error);
		}
	}

	unhold() {
		try {
			this.session.unhold();
		} catch (error) {
			console.warn(error);
		}
	}

	remoteAnswer() {
		try {
			this.session.answer();
			const remoteStream = new MediaStream(
				this.session.connection.getReceivers().map(r => r.track)
			);
			this.audioRemote.srcObject = remoteStream;
			this.audioLocal.play();
		} catch (error) {
			console.warn(error);
		}
	}

	sipCall(sip: string) {
		const eventHandlers = {
			progress: e => {
				console.log('Llamada en progreso');
			},
			failed: e => {
				console.log('Llamada fallida');
			},
			ended: e => {
				console.log('Llamada terminada');
			},
			confirmed: e => {
				console.log('Llamada confirmada');
			}
		};

		const options: UserAgentCallOptions = {
			eventHandlers: eventHandlers,
			mediaConstraints: {
				audio: true,
				video: false
			},
			pcConfig: {
				iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }]
			},
			rtcOfferConstraints: {
				offerToReceiveAudio: true,
				offerToReceiveVideo: false
			}
		};

		if (sip != '') {
			const session = this.ua.call(`sip:${sip}@${config.HOST}`, options);
			if (session) {
				session.connection.addEventListener('addstream', e => {
					this.audioLocal.srcObject = e.stream;
					this.audioLocal.play();
				});
			}
		}
	}

	setSession(session) {
		this.session = session;
	}
	getMessage() {
		return this.msg;
	}

	getUA() {
		return this.ua;
	}

	//test PTT simple **************
	pttOn() {
		this.audioLocal.muted = true;
	}
	pttOff() {
		this.audioLocal.muted = false;
	}
	/*****************************/
	remoteCall() {
		this.session.answer();
		this.session.connection.addEventListener('addstream', e => {
			// @ts-ignore
			this.audioRemote.srcObject = e.stream;
			this.audioRemote.play();
		});
	}
}
