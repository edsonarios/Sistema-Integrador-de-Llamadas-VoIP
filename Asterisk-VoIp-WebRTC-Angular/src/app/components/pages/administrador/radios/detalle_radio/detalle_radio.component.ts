import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'detalleRadio',
	templateUrl: './detalle_radio.component.html',
})
export class DetalleRadioComponent implements OnInit {

	constructor(
		private router: Router,
	) {}

	ngOnInit() {
		
	}

}
