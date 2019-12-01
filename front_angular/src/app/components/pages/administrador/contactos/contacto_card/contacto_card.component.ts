import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'contacto-card',
	templateUrl: './contacto_card.component.html'
})
export class ContactoCardComponent implements OnInit {
	@Input() Nombre:string;
	@Input() Paterno:string;
	@Input() Materno:string;
	@Input() Correo:string;
	@Input() Direccion:string;
	@Input() Telefono:string;
	@Input() Tipo:string;
	@Input() Conectado:string;

	constructor(private router: Router) {
	}

	ngOnInit() {
		
	}
	Detalles(){
		this.router.navigate(['/Administrador/DetalleContacto']);
	}
	
	
}
