import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
@Component({
	selector: 'agregar-cotactos',
	templateUrl: './agregar_contactos.component.html'
})
export class AgregarContactosComponent implements OnInit {
	wrong = false;
	public identity: Object;
	addForm: FormGroup;
	loading = false;
	submitted = false;
	returnUrl: string;

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		public bsModalRef: BsModalRef
	) {
		console.log('Dialpad se cargo Correctamente');
	}

	ngOnInit() {
		this.submit();
		// this.addContact();
		this.addForm = this.formBuilder.group({
			nombre: ['', Validators.required],
			apellido: ['', Validators.required],
			alias: ['', Validators.required],
			tipo: ['', Validators.required],
			telnumero: ['', Validators.required],
			descripcion: ['', Validators.required]
		});
	}
	submit() {}

	get f() {
		return this.addForm.controls;
	}

	addContact() {
		if (this.addForm.invalid) {
			return;
		}
	}

	cerrar(e) {
		e.close();
	}
}
