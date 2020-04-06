import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '@models/user';
import { SipWebRtc } from '@models/sipWebRtc';
import { UserService } from '@services/user.service';
import { SipService } from '@services/sip.service';

import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
	selector: 'agregar-cotacto',
	templateUrl: './agregar_contacto.component.html',
	providers: [UserService]
})
export class AgregarContactosComponent implements OnInit {
	wrong = false;
	public identity: Object;
	addform: FormGroup;
	submitted = false;

	addSipWeb: FormGroup;
	sipweb: SipWebRtc;
	idparcial;

	returnUrl: string;
	formato: [User];

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private formBuilder1: FormBuilder,
		private serviceUser: UserService,
		private serviceSipweb: SipService
	) {
		this.buildForm();
	}

	private buildForm() {
		this.addform = this.formBuilder.group({
			nombre: ['', Validators.required],
			apPaterno: ['', Validators.required],
			apMaterno: ['', Validators.required],
			direccion: ['', Validators.required],
			telefono: ['', Validators.required],
			correo: ['', Validators.required],
			password: ['', Validators.required],
			tipo: ['', Validators.required]
		});

		this.addSipWeb = this.formBuilder1.group({
			alias: ['', Validators.required],
			tipo: ['', Validators.required],
			numero: ['', Validators.required],
			password: ['', Validators.required]
		});

		this.addform.valueChanges.pipe(debounceTime(500)).subscribe(value => {
			console.log(value);
		});
		this.addSipWeb.valueChanges.pipe(debounceTime(500)).subscribe(value => {
			console.log(value);
		});
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

	addContact() {
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

				this.crearcontacto(
					this.addSipWeb.value.alias,
					this.addSipWeb.value.numero,
					this.addSipWeb.value.numero
				);

				this.buildForm();
			}
		});
	}

	crearcontacto(ali, numer, pass) {
		this.serviceUser.addUsuario(this.addform.value).subscribe(
			response => {
				this.veraddSipWeb(response.id, ali, numer, pass);
			},
			er => console.log(er),
			() => console.log('terminado')
		);
		console.log(this.addform.value);

		this.router.navigate(['/Administrador/Contactos']);
	}

	veraddSipWeb(id, ali, numer, pass) {
		this.sipweb = new SipWebRtc(ali, numer, pass, id, 'friend');
		// console.log(this.sipweb);
		this.serviceSipweb.addSipWebRTC(this.sipweb).subscribe(
			response => {
				console.log(response);
			},
			er => console.log(er),
			() => console.log('terminado')
		);
	}
}
