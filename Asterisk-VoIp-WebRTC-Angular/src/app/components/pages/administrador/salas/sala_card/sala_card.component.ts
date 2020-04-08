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
	@Input() IdSala: string;
	@Input() Switch: string;

	constructor(private router: Router, private serviceSala: SalaService) {}

	ngOnInit() {}

	
	Detalles(){
		localStorage.setItem('Sala',JSON.stringify({'ContextSala': this.Nombre,
													'idSala':this.IdSala,
													'descripcion':this.Descripcion,
													'Switch':this.Switch}));
		this.router.navigate(['/Administrador/DetalleSala']);
	}

}
