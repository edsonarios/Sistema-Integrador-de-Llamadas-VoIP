import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'Participante',
	templateUrl: './participante.component.html'
})
export class ParticipanteComponent implements OnInit {
	 @Input() Nombre: string;
	 @Input() Paterno: string;
	 @Input() Materno: string;
	 @Input() Sip: any; 
	 @Input() Iax: any; 
	constructor(private router: Router) {
	}

	ngOnInit() {
	}

}
