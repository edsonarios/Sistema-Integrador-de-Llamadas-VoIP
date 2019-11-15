import { Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'Sala',
	templateUrl: './sala.component.html'
})
export class SalaComponent implements OnInit {
	 @Input() Nombre: string;
	 @Input() Ocupado: string;
	 @Input() Dimensions: string;
	 @Input() Numero: string;
	 @Input() Id: string;

	 public sala;

	@Output() DatoSala = new EventEmitter<string>();
	constructor(private router: Router) {

	}

	ngOnInit() {}
	EntrarSala(Nombre:string,id_sala:string,numero:string) {
    this.sala={'nombre':Nombre,'id':id_sala,'numero':numero};
    this.DatoSala.emit(this.sala);
  }
}
