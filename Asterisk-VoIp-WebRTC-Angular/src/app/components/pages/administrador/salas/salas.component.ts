import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Sala } from '@models/sala';
import { SalaService } from '@services/sala.service';

import Swal from 'sweetalert2';
@Component({
	selector: 'salas',
	templateUrl: './salas.component.html',
	providers: [SalaService]
})
export class SalasComponent implements OnInit {
	public sala;


	constructor(private router: Router, private serviceSala: SalaService) {}

	ngOnInit() {
		this.recibirSalas();
		localStorage.removeItem('Sala');
	}
	prueba(){
		//window.alert('Prueba');
		Swal.fire('Hola Bonita <3');
	}
	recibirSalas() {
		this.serviceSala.listarSalas().subscribe(
			response => {
				console.log(response);
				this.sala = response;
			},
			er => console.log(er),
			() => console.log('terminado')
		);
	}

}
