import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SalaService } from '@services/sala.service';

import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
	selector: 'agregarSala',
	templateUrl: './agregar_sala.component.html',
	providers: [SalaService]
})
export class AgregarSalaComponent implements OnInit {
	addform: FormGroup;
	submitted = false;

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private serviceSala: SalaService
	) {
		this.buildForm();
	}

	private buildForm() {
		this.addform = this.formBuilder.group({
			nombreSala: ['', Validators.required],
			descripcion: ['', Validators.required]
		});

		this.addform.valueChanges.pipe(debounceTime(500)).subscribe(value => {});
	}

	ngOnInit() {}

	onSubmit() {
		this.submitted = true;
		if (this.addform.invalid) {
			return;
		}
	}

	get f() {
		return this.addform.controls;
	}

	addSala() {
		Swal.fire({
			title: 'Esta seguro?',
			text: 'Se añadirá, la Sala!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sí, añadirlo!'
		}).then(result => {
			if (result.value) {
				Swal.fire('Añadido!');
				this.sendSala();
				this.buildForm();
			}
		});
	}

	sendSala() {
		console.log(this.addform.value);
		this.serviceSala.addSala(this.addform.value).subscribe(
			response => {
				console.log(response);
			},
			er => console.log(er),
			() => console.log('terminado')
		);
	}
}
