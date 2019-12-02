import { Component, OnInit ,Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'sala-card',
	templateUrl: './sala_card.component.html'
})
export class SalaCardComponent implements OnInit {
	@Input() Nombre:string;
	@Input() Descripcion:string;
	@Input() Ocupando:string;

	constructor(private router: Router) {
	}

	ngOnInit() {
		
	}
	
}
