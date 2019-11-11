import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'salas',
	templateUrl: './salas.component.html'
})
export class SalasComponent implements OnInit {
	constructor(private router: Router) {
	}

	ngOnInit() {}
	
}
