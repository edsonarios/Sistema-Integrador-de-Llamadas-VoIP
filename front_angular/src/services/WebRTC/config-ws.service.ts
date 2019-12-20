import { Injectable } from "@angular/core";
import JsSIP from "jssip";
import { config } from "./config";
@Injectable({
  providedIn: "root"
})
export class ConfigWSService {
  public sip: String;
  public secret: String;
  public config: Object;
  public ua: any;
  public socket: any;
  public msg: String;
  public audioLocal: HTMLAudioElement = <HTMLAudioElement>(
    document.getElementById("audio-local")
  );

  public audioRemote: HTMLAudioElement = <HTMLAudioElement>(
    document.getElementById("audio-remote")
  );

  // SIP, SECRET
  constructor(sip: String = "7010", secret: String = "7010") {
    // Configuracion basica
    this.socket = this.createWebSocketInterface();
    this.sip = sip;
    this.secret = secret;
    this.config = {
      sockets: [this.socket], // Crear socket
      authorization_user: sip, // Nombre de usuario
      ws_servers: config.WS, // WS Server
      uri: `sip:${sip}@${config.HOST}`, // SIP URI
      display_name: sip, // Nombre de usuario
      password: secret, // secret SIP
      contact_uri: `sip:${sip}@${config.HOST}`, // Contact
      realm: config.HOST
    };

    // Create DOM Audio
    // const audio = document.createElement("AUDIO");
    // audio.id = "audio-local";
    // document.body.firstElementChild.append(audio);
    this.connect();
  }

  createWebSocketInterface() {
    return new JsSIP.WebSocketInterface(config.WS);
  }

  connect() {
    this.ua = new JsSIP.UA(this.config);
    this.ua.start();
    console.log("[ GET ]", this.ua);
    this.msg = "CONECTANDO";
    return "CONECTANDO";
  }

  register() {
    if (!this.ua.isRegistered()) {
      this.ua.register();
      this.msg = "REGISTRADO";
      return "REGISTRADO";
    }
  }

  disconnect() {
    this.ua.unregister();
    this.ua.stop();
    this.msg = "NO REGISTRADO";
    return "NO REGISTRADO";
  }

  eventWebSocket() {
    this.ua.on("connected", e => {
      console.log("[ CONECTADO ]", e);
    });
    this.ua.on("disconnected", e => {
      console.log("[ DESCONECTADO ]", e);
    });
    this.ua.on("registered", e => {
      console.log("[ REGISTRADO ]", e);
    });
    this.ua.on("unregistered", e => {
      console.log("[ NO REGISTRADO ]", e);
    });
    this.ua.on("registrationFailed", e => {
      console.log("[ NO REGISTRADO FALLANDO ]", e);
    });
  }

  call(sip: String) {
    const eventHandlers = {
      progress: function(e) {
        console.log("Llamada en progreso");
      },
      failed: function(e) {
        console.log("Llamada fallida: " + e.data.cause);
      },
      ended: function(e) {
        console.log("Llamada perdida: " + e.data.cause);
      },
      confirmed: function(e) {
        console.log("Llamada confirmada");
      }
    };

    const options = {
      eventHandlers: eventHandlers,
      mediaConstraints: {
        audio: true,
        video: false
      },
      pcConfig: {
        iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }]
      }
    };

    if (sip != "") {
      const session = this.ua.call(`sip:${sip}@${config.HOST}`, options);
      if (session) {
        // media para el navegador
        session.connection.addEventListener("addstream", e => {
          this.audioLocal.srcObject = e.stream;
          this.audioLocal.play();
        });
      }
    }
  }
  public setSIP(sip: String) {
    this.sip = sip;
  }

  public setSecret(secret: String) {
    this.secret = secret;
  }

  public getMsg() {
    return this.msg;
  }

  public getUA() {
    return this.ua;
  }
}
