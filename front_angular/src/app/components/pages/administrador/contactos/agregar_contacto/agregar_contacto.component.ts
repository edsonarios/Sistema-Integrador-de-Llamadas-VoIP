import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '@models/user';
import { UserService } from '@services/user.service';
import { SipService } from '@services/sip.service';

@Component({
	selector: 'agregar-cotacto',
	templateUrl: './agregar_contacto.component.html',
	providers: [UserService],
})
export class AgregarContactosComponent implements OnInit {
	wrong = false;
	public identity: Object;
	addForm: FormGroup;
	addFormSip: FormGroup;
	loading = false;
	public submitted: boolean;
	returnUrl: string;
	formato: [User];



	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private serviceUser: UserService,
	) {
		this.submitted = true;

	}

	ngOnInit(){
		this.addForm = this.formBuilder.group({
			nombre: ['', Validators.required],
			apPaterno:['',Validators.required],
			apMaterno:['',Validators.required],
			direccion:['',Validators.required],
			telefono:['',Validators.required],
			correo:['',Validators.required],
			password:['',Validators.required],
			tipo:['',Validators.required]
		})

	  }


	onSubmit(){

		this.submitted = false;
		if(!this.addForm.invalid){
		  return;
		}
		alert('Mensaje enviado...');

	  }

	get f() {
		return this.addForm.controls;
	}

	

	crearcontacto() {
		this.serviceUser.addUsuario( this.addForm.value)
		.subscribe(
		rt => {	
			console.log(rt);
			console.log(rt.id);
		},
		er => console.log(er),
		() => console.log('terminado')
		);

		console.log(this.addForm.value);
		window.alert("Usuario Creado");
		this.router.navigate(['/Administrador/Contactos']);
	}
	cerrar(e) {
		e.close();
	}
}
