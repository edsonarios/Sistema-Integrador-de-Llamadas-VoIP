import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'radio-card',
	templateUrl: './radio_card.component.html'
})
export class RadioCardComponent implements OnInit {
	@Input() IdRadio:string;
	@Input() NombreRadio:string;
	@Input() DescripcionRadio:string;
	@Input() Switch:string;
	
	constructor(private router: Router) {
	}

	ngOnInit() {}
	DetalleRadio(){
		localStorage.setItem('Radio',JSON.stringify({'ContextRadio': this.NombreRadio,
													'idRadio':this.IdRadio,
													'descripcion':this.DescripcionRadio,
													'Switch':this.Switch}));
		this.router.navigate(['/Administrador/DetalleRadio']);
	}
}
