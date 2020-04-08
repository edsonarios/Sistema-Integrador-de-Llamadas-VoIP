import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';

@Component({
	selector: 'cuenta-card',
	templateUrl: './cuenta_card.component.html'
})
export class CuentaCardComponent implements OnInit {
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
		localStorage.removeItem('idCuenta');
	}
	Detalles(){

		localStorage.setItem('idCuenta',this.Id);
		this.router.navigate(['/Administrador/DetalleCuenta']);
	}
	
	
}
