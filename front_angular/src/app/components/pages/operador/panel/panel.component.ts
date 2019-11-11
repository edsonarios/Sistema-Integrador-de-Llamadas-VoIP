import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'panel',
	templateUrl: './panel.component.html'
})
export class PanelComponent implements OnInit {
	constructor(private router: Router) {
	}

	ngOnInit() {}
}
