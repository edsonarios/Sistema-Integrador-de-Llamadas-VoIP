import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '@models/user';
import { UserService } from '@services/user.service';

import Swal from 'sweetalert2';

@Component({
	selector: 'editar-cuenta',
	templateUrl: './editar_cuenta.component.html',
	providers: [UserService]
})
export class EditarCuentaComponent implements OnInit {
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
		private serviceUser: UserService
	) {
		this.submitted = true;
		this.identy = localStorage.getItem('idCuenta');
	}

	ngOnInit() {
		this.addForm = this.formBuilder.group({
			nombre: ['', Validators.required],
			apPaterno: ['', Validators.required],
			apMaterno: ['', Validators.required],
			direccion: ['', Validators.required],
			telefono: ['', Validators.required],
			correo: ['', Validators.required],
			password: ['', Validators.required],
			tipo: ['', Validators.required]
		});

		console.log(localStorage.getItem('idCuenta'));

		this.inicializar(localStorage.getItem('idCuenta'));
	}

	inicializar(dd) {
		this.serviceUser.findByIdUsuario(dd).subscribe(
			rt => {
				//console.log(rt);
				this.addForm = this.formBuilder.group({
					nombre: [rt.nombre, Validators.required],
					apPaterno: [rt.apPaterno, Validators.required],
					apMaterno: [rt.apMaterno, Validators.required],
					direccion: [rt.direccion, Validators.required],
					telefono: [rt.telefono, Validators.required],
					correo: [rt.correo, Validators.required],
					password: [rt.password, Validators.required],
					tipo: [rt.tipo, Validators.required]
				});
			},
			er => console.log(er),
			() => console.log('terminado')
		);
	}

	get f() {
		return this.addForm.controls;
	}

	editarcontacto() {
		this.serviceUser
			.updateUser(this.addForm.value, localStorage.getItem('idCuenta'))
			.subscribe(
				response => {
					console.log(response);
					this.router.navigate(['/Administrador/DetalleCuenta']);
				},
				er => console.log(er),
				() => console.log('terminado')
			);
	}
	cerrar(e) {
		e.close();
	}

	editContact() {
		Swal.fire({
			title: 'Esta seguro de editar la Cuenta?',
			text: 'Se modificaran todos los cambios realizados',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Aceptar',
		}).then(result => {
			if (result.value) {
				 Swal.fire({
				 		icon: 'success',
					  title: 'Cambios realizados con exito',
					  showConfirmButton: false,
					  timer: 1500,
					 }
				    )
				this.editarcontacto();
			}
		});
	}
}
