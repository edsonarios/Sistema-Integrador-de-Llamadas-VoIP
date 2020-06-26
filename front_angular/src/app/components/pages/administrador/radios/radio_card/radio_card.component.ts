import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'radio-card',
	templateUrl: './radio_card.component.html'
})
export class RadioCardComponent implements OnInit {
	@Input() Alias: string;
	@Input() Numero: string;

	constructor(private router: Router) {}

	ngOnInit() {}
	eliminarsip() {}
}
