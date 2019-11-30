import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'llamada',
	templateUrl: './llamada.component.html'
})
export class LlamadaComponent implements OnInit {
	 @Input() Nombre: string;
	 @Input() Numero: string;
	 @Input() Tipo: string;
	 @Input() Id: string;
	 @Input() Estado: string;

	 @Output() llamadaClose = new EventEmitter<string>();
	 @Output() Participantes = new EventEmitter<string>();
	 public llamada;

	constructor(private router: Router) {

	}

	ngOnInit() {}
	CerrarLlamada(nombre:string,numero:string,id_llamada:string,tipo:string) {
		this.llamada={'Nombre':nombre,'Numero':numero,'Id':id_llamada,'Tipo':tipo};
		this.llamadaClose.emit(this.llamada);
  }
  VerParticipantes(){
  	this.Participantes.emit('Ver Participantes');
  }
}
