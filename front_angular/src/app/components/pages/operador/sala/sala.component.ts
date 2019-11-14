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
	 @Input() Id: string;

	 public sala;

	@Output() propagar = new EventEmitter<string>();
	constructor(private router: Router) {

	}

	ngOnInit() {}
	 onPropagar(Nombre:string,id_sala:string) {
    this.sala={'nombre':Nombre,'id':id_sala};
    this.propagar.emit(this.sala);
  }
}
