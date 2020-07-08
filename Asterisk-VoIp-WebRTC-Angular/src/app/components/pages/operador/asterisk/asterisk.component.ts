import { Component, OnInit } from '@angular/core';
import { AsteriskConnectionService } from '../../../../../services/asterisk-connection.service';

@Component({
    selector: 'app-asterisk',
    templateUrl: './asterisk.component.html',
    styleUrls: ['./asterisk.component.scss']
})
export class AsteriskComponent implements OnInit {
    public apagado = false;
    public estado = '';

    constructor(public asteriskService: AsteriskConnectionService) {}

    ngOnInit(): void {}
    verifica(dato: boolean) {
        if (dato === true) {
            this.estado = 'encender';
        } else {
            this.estado = 'apagar';
        }

        this.asteriskService.accionAsterisk(this.estado);
        //this.asteriskService.encenderAsterisk(this.estado);
    }
    reinicia(): void {
        this.asteriskService.accionAsterisk('reiniciar');
        //this.asteriskService.reiniciarAsterisk('reiniciar');
    }
}
