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
}
