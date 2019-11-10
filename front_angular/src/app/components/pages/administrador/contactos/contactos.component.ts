import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'contactos',
	templateUrl: './contactos.component.html'
})
export class ContactosComponent implements OnInit {
	constructor(private router: Router) {
		console.log('Se cargo los contactos');
	}

	ngOnInit() {}
	
}
