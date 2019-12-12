import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';

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
	@Input() Id:string;

	constructor(private router: Router) {
	}

	ngOnInit() {
		
	}
	Detalles(){
		console.log(this.Id);
		this.router.navigate(['/Administrador/DetalleContacto', {id : this.Id}]);
	}
	
	
}
