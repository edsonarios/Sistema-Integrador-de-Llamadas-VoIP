import { Component, OnInit } from '@angular/core';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { HistorialService } from '../../../../../services/historial.service';
import { LlamadasSalientes } from '../../../../../models/llamadasSalientes.interface';
import { LlamadasEntrantes } from '../../../../../models/llamadasEntrantes.interface';
import * as moment from 'moment';

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

    constructor(private historialService: HistorialService) {
        // this.HistorialNumeroFecha();
    }

    ngOnInit() {
        this.HistorialNumeroFecha();
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
            // this.historialService.HistorialxSipoIaxxFecha(2001, '2020-07-03').subscribe(
            (response) => {
                this.res = response;
                // this.arraySalientes = this.res[0];
                // this.arrayEntrantes = this.res[1];
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
        for (const item of this.res) {
            if (item.tipo === 'entrante' && item.estado === 'BUSY') {
                this.llamadasPerdidas++;
            } else if (item.tipo === 'saliente') {
                this.llamadasRealizadas++;
            } else {
                this.llamadasRecibidas++;
            }
        }
    }
}
