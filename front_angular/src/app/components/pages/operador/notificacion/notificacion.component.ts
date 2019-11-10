import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'Notificacion',
	templateUrl: './notificacion.component.html'
})
export class NotificacionComponent implements OnInit {
	constructor(private router: Router) {
	}

	ngOnInit() {}
}
