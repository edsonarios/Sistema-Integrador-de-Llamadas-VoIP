import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { EstadoAsterisk } from '../models/estadoAsterisk';

@Injectable({
    providedIn: 'root'
})
export class AsteriskConnectionService {
    public estadoA;
    constructor(public wsService: WebsocketService) {}
    getResponse(name: string) {
        return this.wsService.listen(name);
    }

    accionAsterisk(accion: string) {
        const payload = { accion };
        this.wsService.emit2('controlAsterisk', payload);
    }
}
