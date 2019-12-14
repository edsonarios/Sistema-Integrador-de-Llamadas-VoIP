import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '@models/user';
import { UserService } from '@services/user.service';


@Component({
	selector: 'editar-cotacto',
	templateUrl: './editar_contacto.component.html',
	providers: [UserService],
})
export class EditarContactoComponent implements OnInit {
	public identy;
	wrong = false;
	public identity: Object;
	addForm: FormGroup;
	loading = false;
	public submitted: boolean;
	returnUrl: string;
	formato: User;



	constructor(
		private route: ActivatedRoute,
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
		 this.identy = this.route.snapshot.paramMap.get('id');
		console.log(this.route.snapshot.paramMap.get('id'));

		this.inicializar(this.route.snapshot.paramMap.get('id'));


	  }

	  inicializar(dd){
		this.serviceUser.findByIdUsuario( dd)
		.subscribe(
		rt => {
			console.log(rt);
			this.addForm = this.formBuilder.group({
				nombre: [rt.nombre, Validators.required],
				apPaterno:[rt.apPaterno,Validators.required],
				apMaterno:[rt.apMaterno,Validators.required],
				direccion:[rt.direccion,Validators.required],
				telefono:[rt.telefono,Validators.required],
				correo:[rt.correo,Validators.required],
				password:[rt.password,Validators.required],
				tipo:[rt.tipo,Validators.required]
			})
		},
		er => console.log(er),
		() => console.log('terminado')
		);
	  }

	get f() {
		return this.addForm.controls;
	}

	editarcontacto() {
		this.serviceUser.updateUser( this.addForm.value, this.identy)
		.subscribe(
		rt => {
			console.log(rt);
		},
		er => console.log(er),
		() => console.log('terminado')
		);
	}
	cerrar(e) {
		e.close();
	}
}
