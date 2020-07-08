import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
    providedIn: 'root'
})
export class AsteriskConnectionService {
    constructor(public wsService: WebsocketService) {}
    getResponse() {
        return this.wsService.listen('asterisk');
    }
    // encenderAsterisk(estado: string) {
    //     const payload = {
    //         Estado: estado
    //     };
    //     this.wsService.emit1('encender', payload);
    // }
    // reiniciarAsterisk(accion: string) {
    //     const payload = {
    //         Accion: accion
    //     };
    //     this.wsService.emit2('reiniciar', payload);
    // }
    accionAsterisk(accion: string) {
        const payload = { accion };
        this.wsService.emit2('controlAsterisk', payload);
    }
}
