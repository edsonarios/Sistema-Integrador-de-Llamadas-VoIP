import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SipService } from '@services/sip.service';
import { IaxService } from '@services/iax.service';

import Swal from 'sweetalert2';

@Component({
	selector: 'AgregarNumero',
	templateUrl: './agregar_numero.component.html'
})
export class AgregarNumeroComponent implements OnInit {
	public identy;
	addForm: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private formBuilder: FormBuilder,
		private serviceSip: SipService,
		private serviceIax: IaxService
	) {}

	ngOnInit() {
		this.identy = this.route.snapshot.paramMap.get('id');
		console.log(this.route.snapshot.paramMap.get('id'));

		this.addForm = this.formBuilder.group({
			alias: ['', Validators.required],
			tipo: ['', Validators.required],
			numero: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	add() {
		Swal.fire({
			title: 'Esta seguro?',
			text: 'Se añadirá, el número!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sí, añadirlo!'
		}).then(result => {
			this.addnumero();
		});
	}

	addnumero() {
		
		if (this.addForm.value.tipo == 'SIP') {
			this.serviceSip
				.addSIP(
					this.addForm.value.alias,
					this.addForm.value.numero,
					'friend',
					this.addForm.value.password,
					this.identy
				)
				.subscribe(
					rt => {
						console.log('added SIP Extension... ');
						console.log(rt);
					},
					er => console.log(er),
					() => console.log('terminado')
				);
		} else if (this.addForm.value.tipo == 'IAX') {
			this.serviceIax
				.addIAX(
					this.addForm.value.alias,
					this.addForm.value.numero,
					'friend',
					this.addForm.value.password,
					this.identy
				)
				.subscribe(
					rt => {
						console.log('added IAX Extension... ');
						console.log(rt);
					},
					er => console.log(er),
					() => console.log('terminado')
				);
		}

		console.log(this.addForm.value);
	}
}
