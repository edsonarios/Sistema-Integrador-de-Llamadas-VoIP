import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'editarRadio',
	templateUrl: './editar_radio.component.html',
})
export class EditarRadioComponent implements OnInit {

	constructor(
		private router: Router,
	) {}

	ngOnInit() {
		
	}

}
