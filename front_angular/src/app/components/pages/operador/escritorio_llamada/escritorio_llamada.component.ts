import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'escritorio-llamada',
	templateUrl: './escritorio_llamada.component.html'
})
export class EscritorioLlamadaComponent implements OnInit {
	constructor(private router: Router) {

	}

	ngOnInit() {}
}
