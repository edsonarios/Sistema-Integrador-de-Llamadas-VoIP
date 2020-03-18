import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'Agenda',
	templateUrl: './agenda.component.html'
})
export class AgendaComponent implements OnInit {
	public Contactos;
	public llamada;

	@Output() AgendaLlamada = new EventEmitter<string>();
	constructor(private router: Router) {
		this.Contactos = [
			{ Nombre: 'Daniel', Estado: 'Conectado', Numero: '3001', id: '21' },
			{ Nombre: 'Juan', Estado: 'Desconectado', Numero: '3002', id: '22' },
			{ Nombre: 'Marco', Estado: 'Conectado', Numero: '3003', id: '23' },
			{ Nombre: 'Mario', Estado: 'Desconectado', Numero: '3004', id: '24' },
			{ Nombre: 'Alonso', Estado: 'Conectado', Numero: '3005', id: '25' },
			{ Nombre: 'Edgar', Estado: 'Desconectado', Numero: '3006', id: '26' },
			{ Nombre: 'Daniel', Estado: 'Conectado', Numero: '3007', id: '27' },
			{ Nombre: 'Ramiro', Estado: 'Desconectado', Numero: '3008', id: '28' },
			{ Nombre: 'Daniel', Estado: 'Conectado', Numero: '3009', id: '29' },
			{ Nombre: 'Manuel', Estado: 'Desconectado', Numero: '3010', id: '30' }
		];
	}

	ngOnInit() {}
	LlamadaComponent(id, Nombre, numero) {
		this.llamada = { Nombre: Nombre, Numero: numero, Id: id };
		this.AgendaLlamada.emit(this.llamada);
	}
}
