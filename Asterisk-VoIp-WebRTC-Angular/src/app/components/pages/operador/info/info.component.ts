import { Component, OnInit } from '@angular/core';
import { HistorialService } from '../../../../../services/historial.service';
import { LlamadasSalientes } from '@models/llamadasSalientes.interface';
import { LlamadasEntrantes } from '@models/llamadasEntrantes.interface';
import * as moment from 'moment';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { faPhoneSlash } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
    // fontawesome Icons
    public iconEntrante = faLongArrowAltLeft;
    public iconSaliente = faLongArrowAltRight;
    public iconPerdida = faPhoneSlash;
    public iconPhone = faPhone;

    public arrayLlamadas: any[];
    // numero  y fecha de eventos recibidos
    public number;
    public fecha: Date;
    // numero actual del usuario en el sistema
    public numero = localStorage.getItem('NumberSelected');
    // fecha actual
    public fechaActual = moment(new Date()).format('YYYY-MM-DD');
    constructor(public historialService: HistorialService) {}

    ngOnInit() {
        this.HistorialNumeroFecha();
    }
    HistorialNumeroFecha() {
        this.historialService.HistorialxSipoIaxxFecha(this.numero, this.fechaActual).subscribe(
            // this.historialService.HistorialxSipoIaxxFecha('2001', '2020-07-03').subscribe(
            (response) => {
                this.arrayLlamadas = response;
            },
            (error) => {
                console.log('error', error);
            }
        );
    }
}
