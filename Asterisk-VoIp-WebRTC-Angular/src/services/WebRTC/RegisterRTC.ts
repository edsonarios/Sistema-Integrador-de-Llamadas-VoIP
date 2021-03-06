import { getLocalStorageData } from './Utils';
import { WebSocketInterface } from 'jssip';

export class RTCConfig {
	public sip: string;
	public secret: string;
	public host: string;

	public socket: any;

	constructor(host: string) {
		const { name, secret } = getLocalStorageData();
		this.sip = name;
		this.secret = secret;
		this.host = host;
	}

	createConfig(socket: WebSocketInterface) {
		return {
			sockets: [socket], // Crear socket
			uri: `sip:${this.sip}@${this.host}`, // SIP URI
			authorization_user: this.sip, // Nombre de usuario
			// ws_servers: config.WS, // WS Server
			display_name: this.sip, // Nombre de usuario
			password: this.secret, // secret SIP
			contact_uri: `sip:${this.sip}@${this.host}`, // Contact
			realm: this.host
		};
	}
}
