import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'Agenda',
	templateUrl: './agenda.component.html'
})
export class AgendaComponent implements OnInit {
	public Contactos;
	constructor(private router: Router) {
	this.Contactos = [
			{ Nombre: 'Daniel', Estado: 'Conectado', Numero: '3001' },
			{ Nombre: 'Juan', Estado: 'Desconectado', Numero: '3001' },
			{ Nombre: 'Marco', Estado: 'Conectado', Numero: '3001' },
			{ Nombre: 'Mario', Estado: 'Desconectado', Numero: '3002' },
			{ Nombre: 'Alonso', Estado: 'Conectado', Numero: '3001' },
			{ Nombre: 'Edgar', Estado: 'Desconectado', Numero: '3001' },
			{ Nombre: 'Daniel', Estado: 'Conectado', Numero: '3001' },
			{ Nombre: 'Ramiro', Estado: 'Desconectado', Numero: '3002' },
			{ Nombre: 'Daniel', Estado: 'Conectado', Numero: '3001' },
			{ Nombre: 'Manuel', Estado: 'Desconectado', Numero: '3001' }
			
		];
	}

	ngOnInit() {}
	LlamadaComponent(){
		console.log('Procediendo a llamar');
	}
}
