import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { GLOBAL } from '@services/global';

@Component({
    selector: 'panel',
    templateUrl: './panel.component.html'
})
export class PanelComponent implements OnInit {
    // @Input() Tiempo: string;
    // @Input() Objeto: any;

    // public eventoPanel;

    /*
	[
		["7005"],["7003"],["ANSWERED"]]*/
    // public Panel = [];
    public urlSocket: string;
    public socket;
    public hide = localStorage.getItem('PanelHide');
    @Output() Metodo1 = new EventEmitter<string>();
    @Output() Metodo2 = new EventEmitter<string>();
    @Output() Metodo3 = new EventEmitter<string>();

    public VectorPaneles = [];
    constructor(private router: Router) {
        this.socket = io(GLOBAL.urlSocket);
        console.log(this.socket);
    }

    ngOnInit() {
        //  this.Panel = this.Objeto;
    }
    ngAfterViewInit(): void {
        //estado de los botones en tiempo real
        this.startRealtime();
    }
    async startRealtime() {
        this.socket.on('Llamadas', (payload) => {
            console.log(payload);
            this.BusquedaExistente(payload);
        });
    }
    BusquedaExistente(Vector) {
        if (this.BusquedaExistentenEventoPanel(Vector)) {
            //si existe actualiza el dato
            this.ActualizarEventoPanel(Vector);
        } else {
            // si no existe solo lo adiciona en su ultimo estado
            this.AgregarEventoPanel(Vector);
        }
        this.EliminaHangups(this.VectorPaneles);
    }
    EliminaHangups(VectorPaneles) {
        let aux = [];
        let long = 0;
        for (let i = 0; i < VectorPaneles.length; i++) {
            if (VectorPaneles[i]['evento'] != 'Hangup') {
                aux[long] = VectorPaneles[i];
                long = long + 1;
            }
        }
        this.VectorPaneles = aux;
    }
    BusquedaExistentenEventoPanel(Vector) {
        // recorre todo el vecto en busqueda de los datos repetidos
        for (let j = 0; j < this.VectorPaneles.length; j++) {
            if (
                (this.VectorPaneles[j]['numero'] == Vector['numero'] && this.VectorPaneles[j]['extension'] == Vector['extension']) ||
                (this.VectorPaneles[j]['extension'] == Vector['numero'] && this.VectorPaneles[j]['numero'] == Vector['extension'])
            ) {
                return true;
            } else {
            }
        }
        return false;
    }
    AgregarEventoPanel(Payload) {
        this.VectorPaneles.push(Payload);
    }
    ActualizarEventoPanel(Vector) {
        const Long = this.VectorPaneles.length;
        this.VectorPaneles[Long - 1] = Vector;
    }
    Opcion1() {
        console.log(this.VectorPaneles);
        this.Metodo1.emit('dato Emitido opcion 1');
    }
    Opcion2() {
        this.Metodo2.emit('dato Emitido opcion 2');
    }
    Opcion3() {
        this.Metodo3.emit('dato Emitido opcion 3');
    }
}
