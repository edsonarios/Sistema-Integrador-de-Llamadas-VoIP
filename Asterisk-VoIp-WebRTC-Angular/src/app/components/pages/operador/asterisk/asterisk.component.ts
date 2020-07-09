import { Component, OnInit, Input } from '@angular/core';
import { AsteriskConnectionService } from '../../../../../services/asterisk-connection.service';
import { EstadoAsterisk } from '@models/estadoAsterisk';

@Component({
    selector: 'app-asterisk',
    templateUrl: './asterisk.component.html',
    styleUrls: ['./asterisk.component.scss']
})
export class AsteriskComponent implements OnInit {
    public apagado = false;
    public estado = '';

    constructor(public estadoService: AsteriskConnectionService) {}

    ngOnInit(): void {
        this.estadoService.getResponse('asterisk').subscribe((msg: EstadoAsterisk) => {
            if (msg.evento) {
                this.apagado = true;
            } else {
                this.apagado = false;
            }
        });
        this.estadoService.accionAsterisk('estado');
    }
    verifica(dato: boolean) {
        if (dato === true) {
            this.estado = 'encender';
        } else {
            this.estado = 'apagar';
        }

        this.estadoService.accionAsterisk(this.estado);
    }
    reinicia(): void {
        this.estadoService.accionAsterisk('reiniciar');
    }
}
