import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'agrega-radio',
	templateUrl: './agregar_radio.component.html'
})
export class AgregarRadioComponent implements OnInit {
	constructor(private router: Router) {
	}

	ngOnInit() {}
}
