import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'llamada',
	templateUrl: './llamada.component.html'
})
export class LlamadaComponent implements OnInit {
	 @Input() Nombre: string;
	 @Input() Numero: string;
	 @Input() Tipo: string;
	 @Input() Id: string;
	 @Input() Estado: string;
	constructor(private router: Router) {

	}

	ngOnInit() {}
}
