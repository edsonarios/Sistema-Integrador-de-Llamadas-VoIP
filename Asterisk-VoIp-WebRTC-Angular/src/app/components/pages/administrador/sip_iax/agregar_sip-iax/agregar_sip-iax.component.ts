import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from '@services/user.service';
@Component({
	selector: 'sip_iax-agregar',
	templateUrl: './agregar_sip-iax.component.html',
	providers: [UserService],
})
export class Agregar_Sip_IaxComponent implements OnInit {
	public IdUsuario;
	Sip_Iax_form: FormGroup;
	public hiddenForm=0;
	public correo;
	public Cuentas;
	public EnableWebRTC=0;

	constructor(private router: Router,
				private formBuilder: FormBuilder,
				private userservice: UserService) {

		this.IdUsuario=localStorage.getItem('idCuenta');
		if (this.IdUsuario==null) {
			console.log('No hay usuario');
			this.IdUsuario='none'

			this.userservice.findAllUsuario()
			.subscribe(
			rt => {
				//console.log('Estos son los contactos existentes... \n');
				this.Cuentas = rt;
				//console.log(this.Cuentas);
			},
			er => console.log(er)
			);
		}
		else{

			//console.log('Existe el Usuario');
			this.correo=localStorage.getItem('Correo');
		}
		this.buildForm();
	}


	private buildForm() {
		this.Sip_Iax_form = this.formBuilder.group({
			name: ['', Validators.required],
			callerid: ['', Validators.required],
			secret: ['', Validators.required],
		});
	}

	ngOnInit() {
		console.log('Las cuentas son los siguientes');
		console.log(this.Cuentas);
	}
	SelectSip(){
		this.hiddenForm=1;
	}
	cambio(){
		if (this.EnableWebRTC==0) {
			this.EnableWebRTC=1;
		}
		else{
			this.EnableWebRTC=0;
		}
	}
	addSip(){
		Swal.fire({
			title: 'Confirmacion',
			html:
			    'Esta seguro de crear el siguiente numero? ' +
			    '<br><b>3001</b> ',
			icon: 'info',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Si estoy seguro'
		}).then(result => {
			if (result.value) {
				 Swal.fire({
				 		icon: 'success',
					  title: 'Numero Sip Agregado',
					  showConfirmButton: false,
					  timer: 1500,
					 }
				    )
				//Aqui va el codigo
				
			}
		});
	}
}
