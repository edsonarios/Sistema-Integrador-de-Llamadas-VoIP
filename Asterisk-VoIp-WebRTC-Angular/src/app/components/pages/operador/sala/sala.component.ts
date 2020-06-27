import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'Sala',
	templateUrl: './sala.component.html'
})
export class SalaComponent implements OnInit {
	@Input() Nombre: string;
	@Input() Descripcion: string;
	@Input() Id: string;

	public Numero;
	public sala;

	@Output() DatoSala = new EventEmitter<string>();
	constructor(private router: Router) {}
	ngOnInit() {}
	EntrarSala(Nombre: string, id_sala: string, desc: string) {
		this.sala = { nombre: Nombre, id: id_sala, descripcion: desc };
		this.DatoSala.emit(this.sala);
		console.log(this.sala);
	}

	sipCall(sip) {}
}
