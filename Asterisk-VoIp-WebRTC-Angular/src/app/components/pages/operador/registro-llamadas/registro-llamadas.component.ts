import { Component, OnInit } from '@angular/core';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { HistorialService } from '../../../../../services/historial.service';
import { LlamadasSalientes } from '../../../../../models/llamadasSalientes.interface';
import { LlamadasEntrantes } from '../../../../../models/llamadasEntrantes.interface';
import * as moment from 'moment';
import { AsteriskConnectionService } from '../../../../../services/asterisk-connection.service';
import { Llamadas } from '../../../../../models/llamada.interface';

@Component({
    selector: 'app-registro-llamadas',
    templateUrl: './registro-llamadas.component.html',
    styleUrls: ['./registro-llamadas.component.scss']
})
export class RegistroLlamadasComponent implements OnInit {
    phoneIcon = faPhone;
    public res: any[];
    // numero actual del usuario en el sistema
    public numero = localStorage.getItem('NumberSelected');
    // fecha actual
    public fecha = moment(new Date()).format('YYYY-MM-DD');

    // array de llamadas
    public arraySalientes: LlamadasSalientes[];
    public arrayEntrantes: LlamadasEntrantes[];
    // cantidad inicial de llamadas
    public llamadasRealizadas = 0;
    public llamadasRecibidas = 0;
    public llamadasPerdidas = 0;

    constructor(private historialService: HistorialService, public estadoService: AsteriskConnectionService) {
        // this.HistorialNumeroFecha();
    }

    ngOnInit() {
        this.HistorialNumeroFecha();
        this.estadoService.getResponse('Llamadas').subscribe((data: Llamadas) => {
            if (data.evento === 'Hangup') {
                this.HistorialNumeroFecha();
            }
        });
    }

    prueba() {
        this.historialService.HistorialxSipoIaxEntreFecha('2001', '2020-01-01', '2020-07-02').subscribe(
            (response) => {
                this.res = response;

                console.log('exito', response);
            },
            (error) => {
                console.log('error', error);
            }
        );
    }
    HistorialNumeroFecha() {
        this.historialService.HistorialxSipoIaxxFecha(this.numero, this.fecha).subscribe(
            (response) => {
                this.res = response;
                this.getCantidadLlamadas();
                console.log('exito', response);
                console.log('fecha:', this.fecha);
            },
            (error) => {
                console.log('error', error);
            }
        );
    }
    getCantidadLlamadas() {
        this.llamadasRealizadas = 0;
        this.llamadasRecibidas = 0;
        this.llamadasPerdidas = 0;

        for (const item of this.res) {
            if (item.tipo === 'entrante' && item.estado === 'NO ANSWER') {
                this.llamadasPerdidas++;
            } else if (item.tipo === 'saliente') {
                this.llamadasRealizadas++;
            } else {
                this.llamadasRecibidas++;
            }
        }
    }
}
