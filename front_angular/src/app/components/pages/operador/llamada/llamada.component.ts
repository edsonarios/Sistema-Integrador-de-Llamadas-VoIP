import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'llamada',
	templateUrl: './llamada.component.html'
})
export class LlamadaComponent implements OnInit {
	constructor(private router: Router) {}

	ngOnInit() {}
}
