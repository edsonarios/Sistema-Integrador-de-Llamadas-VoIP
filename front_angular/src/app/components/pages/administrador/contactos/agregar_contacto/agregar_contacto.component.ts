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
		private formBuilder2: FormBuilder,
		private serviceUser: UserService,
		private serviceSip: SipService,
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

		})
		this.addFormSip = this.formBuilder2.group({
			name: ['', Validators.required],
    		callerid: ['',Validators.required]
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

	// adjuntarSip(idu){	
		
	// 	 this.serviceSip.addSIP( this.addFormSip.value.name, this.addFormSip.value.callerid, idu)
	// 	.subscribe(
	// 	rt => {
			
	// 		console.log('added SIP Extension... ');
	// 		console.log(rt);
	// 	},
	// 	er => console.log(er),
	// 	() => console.log('terminado')
	// 	);
	// 	console.log(this.addForm.value);		
	// }

	crearcontacto() {
		this.serviceUser.addUsuario( this.addForm.value)
		.subscribe(
		rt => {	
			console.log(rt);
			console.log(rt.id);
			//this.adjuntarSip(rt.id);
		},
		er => console.log(er),
		() => console.log('terminado')
		);

		console.log("Eh aqui los datos susodichos...   ");
		console.log(this.addForm.value);
		window.alert("Usuario Creado");
		this.router.navigate(['/Administrador/Contactos']);
		//console.log('Tambien los datos para el envio de los datos SIP..   ');
		//console.log(this.addFormSip.value);
	}
	cerrar(e) {
		e.close();
	}
}
