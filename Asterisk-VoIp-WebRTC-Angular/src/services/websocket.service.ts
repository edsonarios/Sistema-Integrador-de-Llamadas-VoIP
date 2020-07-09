import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { EstadoAsterisk } from '../models/estadoAsterisk';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    public estadoAsterisk: EstadoAsterisk;
    public socketStatus = false;
    constructor(private socket: Socket) {
        this.cargarStorage();
    }

    listen(evento: any) {
        this.estadoAsterisk = new EstadoAsterisk(evento);
        this.guardarStorage();
        return this.socket.fromEvent(evento);
    }

    guardarStorage() {
        localStorage.setItem('estadoA', JSON.stringify(this.estadoAsterisk));
    }
    cargarStorage() {
        if (localStorage.getItem('estadoA')) {
            this.estadoAsterisk = JSON.parse(localStorage.getItem('estadoA'));
        }
    }

    emit2(estado: string, payload?: any) {
        // var x = { saludo: 'hola' };
        // payload = x;
        console.log('nombreSocket: ', estado, 'payload: ', payload);
        this.socket.emit(estado, payload);
    }
}
