import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'escritorio-sala',
	templateUrl: './escritorio_sala.component.html'
})
export class EscritorioSalaComponent implements OnInit {
	constructor(private router: Router) {

	}

	ngOnInit() {}
}
