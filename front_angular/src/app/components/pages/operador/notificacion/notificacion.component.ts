import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'Notificacion',
	templateUrl: './notificacion.component.html'
})
export class NotificacionComponent implements OnInit {
	 @Input() Nombre: string;
	 @Input() Numero: string;
	 @Input() Estado: string;
	 @Input() Id: string;

	 @Output() ContestaLlamada = new EventEmitter<string>();
	 @Output() CancelaLlamada = new EventEmitter<string>();

	 public notificacion;
	constructor(private router: Router) {
	}

	ngOnInit() {}

	ContestarLlamada(nombre:string,numero:string,id:string) {
		this.notificacion={'Nombre':nombre,'Numero':numero,'Id':id};
		this.ContestaLlamada.emit(this.notificacion);
  	}
  	ColgarLlamada(nombre:string,numero:string,id:string){
  		this.notificacion={'Nombre':nombre,'Numero':numero,'Id':id};
  		this.CancelaLlamada.emit(this.notificacion);
  	}
}
