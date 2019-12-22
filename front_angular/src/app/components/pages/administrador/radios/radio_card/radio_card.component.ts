import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'radio-card',
	templateUrl: './radio_card.component.html'
})
export class RadioCardComponent implements OnInit {
	constructor(private router: Router) {
	}

	ngOnInit() {}
}
