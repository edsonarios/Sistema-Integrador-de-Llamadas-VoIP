import { Component, OnInit, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { title } from 'process';
import { AgendaService } from '@services/agenda.service';
import { SalaService } from '@services/sala.service';


@Component({
    selector: 'add-participante',
    templateUrl: './add-participante.component.html',
    styleUrls: ['./add-participante.component.scss']

})
export class AddParticipanteComponent implements OnInit {
    
    @Input() miembros: any[];
    @Input() nomSala: any;
    @Input() idSala: any;
    
    modalRef: BsModalRef;
    partisExternos = [];


    constructor(private modalService: BsModalService, private agendaservice: AgendaService, private salaservice: SalaService) {
        
            
        
    }

    compara(it){
        console.log(it);
        
    }

    ngOnInit() {
       console.log(this.miembros);
       console.log(this.nomSala);
       this.agendaservice.listarOperadores().subscribe(
        (response) => {
            this.partisExternos = response; 
            response.forEach((element) => {
                // console.log(element);
                this.partisExternos = this.partisExternos.filter(word => word.numeroSip == element.numeroSip);
                console.log(this.partisExternos);
                // this.compara(element);
            });
        },
        (er) => console.log(er)
    );
    }


    cambiarSala(usid, numero){
        let objeto = { id: usid, cambioSalaId: this.idSala, numero: numero, cambioSala: this.nomSala };
        console.log(objeto);
        // this.salaservice.CambioDeSala()
    }

}
