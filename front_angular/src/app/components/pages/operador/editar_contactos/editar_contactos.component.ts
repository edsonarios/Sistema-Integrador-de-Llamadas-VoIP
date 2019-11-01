import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { User } from '@models/user';

// import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
	selector: 'Editar-Contactos',
	templateUrl: './editar_contactos.component.html',
	providers: [UserService]
})
export class EditarContactosComponent implements OnInit {
	wrong = false;
	public identity: Object;
	editForm: FormGroup;
	loading = false;
	submitted = false;
	returnUrl: string;
	user: User;
	constructor(
		private router: Router,
		public userService: UserService,
		private formBuilder: FormBuilder,
		public bsModalRef: BsModalRef
	) {}

	ngOnInit() {
		console.log('Componente formulario para editar cargado');

		// this.editContact() //-warnings en consola

		this.editForm = this.formBuilder.group({
			nombre: ['', Validators.required],
			apellido: ['', Validators.required],
			alias: ['', Validators.required],
			tipo: ['', Validators.required],
			telnumero: ['', Validators.required],
			descripcion: ['', Validators.required]
		});
	}
	editContact() {
		if (this.editForm.invalid) {
			return;
		}
	}
}
