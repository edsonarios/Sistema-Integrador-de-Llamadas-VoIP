import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { WebRTCService } from '@services/WebRTC/WebRTC.service';


@Component({
    selector: 'intervencion',
    templateUrl: './intervencion.component.html',
    styleUrls: ['./intervencion.component.scss']

})
export class IntervencionComponent implements OnInit {

    @Input() numDts: any;
    @Input() numSrc: any;
    @Input() nomDts: any;
    @Input() nomSrc: any;

    modal: any;


    over = '';
    ni = '';
    llamando = false;

    public session: WebRTCService;

    constructor(private modalService:BsModalService
    ) {}

    ngOnInit() {
        
        this.session = new WebRTCService();
        this.session.sessionEvents();
    }    


    intervenir(modal){
        this.modal = this.modalService.show(modal);
    }

    intervencion(option) {
        console.log(option, this.ni);
        switch (option) {
            case 'silen':
                //  555
                // this.session.sipCall('555' + this.numSrc);
                console.log('555' + this.numSrc);
                this.llamando = true;
                this.modal.hide();
                break;
            case 'od':
                //  556
                // this.session.sipCall('556' + this.ni);
                console.log('556' + this.ni);
                this.llamando = true;
                this.modal.hide();
                break;
            case 'ambos':
                // 557
                // this.session.sipCall('557' + this.numSrc);
                console.log('557' + this.numSrc);
                this.llamando = true;
                this.modal.hide();
                break;
            default:
                break;
        }
    }

    cambioIntervencion(esto, numero) {
        this.over = esto.toLowerCase();
        this.ni = numero;
    }

    endCall() {
        this.llamando = false;
        this.session.terminate();
        this.numDts = false;
    }

    cerrarIntervenion(){
        this.numDts = false;
    }
}
