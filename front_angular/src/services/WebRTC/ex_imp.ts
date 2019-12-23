import { Component } from "@angular/core";
import { ConfigWSService } from "./config-ws.service";
@Component({
  selector: "demo-llamada",
  templateUrl: "./ex_imp.html",
  //styleUrls: ["./app.component.scss"]
})
export class DemoLlamadaComponent {
  msg: String = "Events";
  events: any;
  service: any;
  sessionRemote: any;
  sessionLocal: any;
  data: any;
  arr: Array<any> = [];
  audioRemote: HTMLAudioElement = <HTMLAudioElement>(
    document.getElementById("audio-remote")
  );
  ngOnInit() {
    const s = new ConfigWSService();
    this.service = s;
    this.service.eventWebSocket();
    this.service.getUA().on("newRTCSession", data => {
      let session = data.session;
      this.arr.push(session);

      this.sessionLocal = session;
      console.log("[ NEW RTC SESSION ]", data);
      console.log("[ NEW RTC DATA ]", data.session.connection);
      if (data.originator === "local") {
        console.log("LLAMADA LOCAL");
      } else if (data.originator === "remote") {
        console.log("LLAMADA REMOTA");
      }
      console.log(this.arr);
    });
    this.msg = s.getMsg();
  }

  conectar() {
    this.msg = this.service.connect();
    console.log(this.msg);
  }
  desconectar() {
    this.msg = this.service.disconnect();
    console.log(this.msg);
  }
  registrar() {
    this.msg = this.service.register();
  }
  // Llamar a un sip
  call(sip: String) {
    this.service.call(sip);
  }

  responder() {
    const options = {
      mediaConstraints: {},
      pcConfig: {
        iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }]
      }
    };
    this.arr[this.arr.length - 1].answer(options);
    this.arr[this.arr.length - 1].connection.addEventListener(
      "addstream",
      e => {
        this.audioRemote.srcObject = e.stream;
        this.audioRemote.play();
      }
    );
  }
  terminar() {
    this.arr[this.arr.length - 1].terminate();
  }

  mute() {
    this.arr[this.arr.length - 1].mute();
  }
  unmute() {
    this.arr[this.arr.length - 1].unmute();
  }
}
