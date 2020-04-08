import { Component, OnInit ,TemplateRef} from '@angular/core';
import { Router } from '@angular/router';


import { UserService } from '@services/user.service';
import { User } from '@models/user';
@Component({
	selector: 'cuentas',
	templateUrl: './cuentas.component.html',
	providers: [UserService],
})
export class CuentasComponent implements OnInit {

	contactos: [User];
	
	constructor(private router: Router,
              private userservice: UserService
  ) {
	 

	}

	ngOnInit() {this.listarContacto()}
 
	
  listarContacto(){
		 this.userservice.findAllUsuario()
		.subscribe(
		rt => {
			console.log('Estos son los contactos existentes... \n');
			this.contactos = rt;
			console.log(this.contactos);
		},
		er => console.log(er)
		);
		
  }	
  
}
