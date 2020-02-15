/*import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { WebRTCService } from "./service/WebRTC/WebRTC.service";
import { RTCSession } from "jssip";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
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
  responder() {
    this.session.remoteAnswer();
  }

  mute() {
    this.session.mute();
  }

  unmute() {
    this.session.unmute();
  }
}
*/