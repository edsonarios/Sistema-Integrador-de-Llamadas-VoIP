import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalaService } from '@services/sala.service';

@Component({
	selector: 'editarSala',
	templateUrl: './editar_sala.component.html',
	providers: [SalaService]
})
export class EditarSalaComponent implements OnInit {

	constructor(
		private router: Router,
		private serviceSala: SalaService
	) {}

	ngOnInit() {
		
	}

}
