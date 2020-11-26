import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { GLOBAL } from '@services/global';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from '../../../../../services/user.service';
import { WebRTCService } from '@services/WebRTC/WebRTC.service';

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

    // variables para intervencion de llamadas
    numSrc;
    numDts;
    opeSrc = { nombre: 'Numero', apPaterno: 'Externo' };
    opeDts = { nombre: 'Numero', apPaterno: 'Externo' };
    over = '';
    ni = '';
    swInter = false;
    numeroActual = localStorage.getItem('NumberSelected');
    @Output()
    IntervencionLlamada: EventEmitter<Object> = new EventEmitter<Object>();
    detalle;

    // variables para llamadas
    public session: WebRTCService;

    public VectorPaneles = [];
    constructor(private router: Router, private modalService: BsModalService, private userService: UserService) {
        this.socket = io(GLOBAL.urlSocket);
        console.log(this.socket);
    }

    ngOnInit() {
        this.session = new WebRTCService();
        this.session.sessionEvents();
        //  this.Panel = this.Objeto;
    }
    ngAfterViewInit() {
        // estado de los botones en tiempo real
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
            // si existe actualiza el dato
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

    // intervencion(n){
    //     console.log(n);
    //     console.log('origen', this.opeSrc);
    //     console.log('destino', this.opeDts);
    // }

    intervencion(option) {
        console.log(option, this.ni);
        switch (option) {
            case 'silen':
                //  555
                this.session.sipCall('555' + this.numSrc);
                console.log('555' + this.numSrc);
                break;
            case 'od':
                //  556
                this.session.sipCall('556' + this.ni);
                console.log('556' + this.ni);
                break;
            case 'ambos':
                // 557
                this.session.sipCall('557' + this.numSrc);
                console.log('557' + this.numSrc);
                break;
            default:
                break;
        }
    }

    cambioIntervencion(esto, numero) {
        this.over = esto.toLowerCase();
        this.ni = numero;
    }

    validacionOperadores(n): boolean {
        if (this.numeroActual === n.extension || this.numeroActual === n.numero) {
            return true;
        } else {
            return false;
        }
    }

    enviarIntervencion(n) {
        console.log();
        var detallesllamada = { extension: n.extension, numero: n.numero };
        console.log('interviniendo...');
        this.numSrc = detallesllamada.extension;
        this.numDts = detallesllamada.numero;

        // if (this.numeroActual === detallesllamada.extension || this.numeroActual === detallesllamada.numero) {
        //     console.log('NO PUEDES INTERVENIR ESTA LLAMADA');
        // } else {
            this.numSrc = detallesllamada.extension;
            this.numDts = detallesllamada.numero;
            console.log(this.numSrc);
            console.log(this.numDts);
            this.userService.detalleUsuario(this.numSrc).subscribe((response) => {
                if (response[0] === undefined) {
                    console.log(' EL NUMERO ES EXTERNO');
                } else {
                    console.log(response[0]);
                    this.opeSrc = response[0];
                }
            });
            this.userService.detalleUsuario(this.numDts).subscribe((response) => {
                if (response[0] === undefined) {
                    console.log(' EL NUMERO ES EXTERNO');
                } else {
                    console.log(response);
                    this.opeDts = response[0];
                }
            });
            console.log('origen', this.numSrc);
            console.log('destino', this.numDts);
        // }
        this.swInter = !this.swInter;    
        this.detalle = { show: this.swInter, nomSrc: this.opeSrc, numSrc: this.numSrc, nomDts: this.opeDts, numDts: this.numDts };
        console.log(this.detalle);
        this.IntervencionLlamada.emit(this.detalle);
    }

    modalinter(modal, n) {
        // this.IntervencionLlamada.emit("Mensaje desde el componente hijo");
        // if (this.numeroActual === n.extension || this.numeroActual === n.numero) {
        //     console.log('NO PUEDES INTERVENIR ESTA LLAMADA');
        // } else {
        //     this.numSrc = n.extension;
        //     this.numDts = n.numero;
        //     console.log(this.numSrc);
        //     console.log(this.numDts);
        //     this.userService.detalleUsuario(this.numSrc).subscribe((response) => {
        //         if (response[0] === undefined) {
        //             console.log(' EL NUMERO ES EXTERNO');
        //         } else {
        //             console.log(response[0]);
        //             this.opeSrc = response[0];
        //         }
        //     });
        //     this.userService.detalleUsuario(this.numDts).subscribe((response) => {
        //         if (response[0] === undefined) {
        //             console.log(' EL NUMERO ES EXTERNO');
        //         } else {
        //             console.log(response);
        //             this.opeDts = response[0];
        //         }
        //     });
        //     this.modalService.show(modal);
        //     console.log('origen', this.numSrc);
        //     console.log('destino', this.numDts);
        // }
    }
}
