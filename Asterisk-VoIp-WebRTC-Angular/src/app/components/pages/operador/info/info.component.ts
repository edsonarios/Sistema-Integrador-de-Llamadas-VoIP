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

    public res: any[];
    // numero  y fecha de eventos recibidos
    public number;
    public fecha: Date;
    // numero actual del usuario en el sistema
    public numero = localStorage.getItem('NumberSelected');
    // array de llamadas
    public arraySalientes: LlamadasSalientes[];
    public arrayEntrantes: LlamadasEntrantes[];
    // fecha actual
    public fechaActual = moment(new Date()).format('YYYY-MM-DD');
    constructor(public historialService: HistorialService) {}

    ngOnInit() {
        this.HistorialNumeroFecha();
    }
    HistorialNumeroFecha() {
        this.historialService.HistorialxSipoIaxxFecha(this.numero, this.fechaActual).subscribe(
            (response) => {
                this.res = response;
                this.arraySalientes = this.res[0];
                this.arrayEntrantes = this.res[1];
            },
            (error) => {
                console.log('error', error);
            }
        );
    }
}
