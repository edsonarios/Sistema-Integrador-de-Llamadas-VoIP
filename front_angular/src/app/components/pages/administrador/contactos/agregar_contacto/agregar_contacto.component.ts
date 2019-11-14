import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '@models/user';
import { UserService } from '@services/user.service';
import { SipService } from '@services/sip.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
@Component({
	selector: 'agregar-cotacto',
	templateUrl: './agregar_contacto.component.html',
	providers: [UserService],
})
export class AgregarContactosComponent implements OnInit {
	wrong = false;
	public identity: Object;
	addForm: FormGroup;
	loading = false;
	public submitted: boolean;
	returnUrl: string;
	formato: [User];

	

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private serviceUser: UserService,
		private serviceSip: SipService,
		public modalRef: BsModalRef
	) {
		this.submitted = true;
		
	}
	
	ngOnInit(){
		this.addForm = this.formBuilder.group({
			nombre: ['', Validators.required],
			apellido:['',Validators.required],
			alias:['',Validators.required],
			telnumero:['',Validators.required],
			tipo:['',Validators.required],
			descripcion:['',Validators.required]	
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

	crearcontacto() {
		
		var tip = this.addForm.value.tipo;
		if(tip == 'SIP'){
		console.log(this.addForm.value);
		 this.serviceSip.addSIP( this.addForm.value)
		.subscribe(
		rt => {
			this.formato=rt;
			console.log(this.formato);
		},
		er => console.log(er),
		() => console.log('terminado')
		);
		console.log(this.addForm.value);
		}	
	
	}
	cerrar(e) {
		e.close();
	}
}
