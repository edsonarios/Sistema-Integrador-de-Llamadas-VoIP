import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SipService } from '@services/sip.service';

import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
	selector: 'agrega-radio',
	templateUrl: './agregar_radio.component.html'
})
export class AgregarRadioComponent implements OnInit {
	addform: FormGroup;
	submitted = false;

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private serviceSip: SipService
	) {
		this.buildForm();
	}

	private buildForm() {
		this.addform = this.formBuilder.group({
			alias: ['RADIO ' + '', Validators.required],
			numero: ['', Validators.required],
			password: ['', Validators.required]
		});

		this.addform.valueChanges.pipe(debounceTime(500)).subscribe(value => {});
	}

	onSubmit() {
		this.submitted = true;
		if (this.addform.invalid) {
			return;
		}
	}

	get f() {
		return this.addform.controls;
	}

	ngOnInit() {}

	addRadio() {
		Swal.fire({
			title: 'Esta seguro?',
			text: 'Se añadirá, el contacto!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sí, añadirlo!'
		}).then(result => {
			if (result.value) {
				Swal.fire('Añadido!');
				console.log(this.addform.value);
				this.addradio();
				this.buildForm();
			}
		});
	}

	addradio() {
		console.log(this.addform.value);
		this.serviceSip
			.addSIP(
				this.addform.value.alias,
				this.addform.value.numero,
				'radio',
				this.addform.value.password,
				25
			)
			.subscribe(
				response => {
					console.log('added Radio SIP Extension... ');
					console.log(response);
				},
				er => console.log(er)
			);
	}
}
