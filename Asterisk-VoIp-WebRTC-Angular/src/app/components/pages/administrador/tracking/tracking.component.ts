import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'tracking',
	templateUrl: './tracking.component.html'
})
export class TrackingComponent implements OnInit {
	constructor(private router: Router) {
		console.log('El tracking se cargo correctamente');
	}

	ngOnInit() {}
}
