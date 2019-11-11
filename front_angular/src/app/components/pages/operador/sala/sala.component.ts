import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'Sala',
	templateUrl: './sala.component.html'
})
export class SalaComponent implements OnInit {
	constructor(private router: Router) {
	}

	ngOnInit() {}
}
