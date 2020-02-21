import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SalaService } from '@services/sala.service';

@Component({
	selector: 'sala-card',
	templateUrl: './sala_card.component.html',
	providers: [SalaService]
})
export class SalaCardComponent implements OnInit {
	@Input() Nombre: string;
	@Input() Descripcion: string;
	// @Input() Ocupando:string;
	@Input() IdSala: string;

	constructor(private router: Router, private serviceSala: SalaService) {}

	ngOnInit() {}

	// deleteSala(){
	// 		this.serviceSala.deleteSala(this.IdSala)
	// 		  .subscribe(
	// 			data => {
	// 			  console.log(data);
	// 			},
	// 			error => console.log(error));
	// }
}
