import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'radios',
	templateUrl: './radios.component.html'
})
export class RadiosComponent implements OnInit {
	constructor(private router: Router) {
		
	}

	ngOnInit() {}
}
