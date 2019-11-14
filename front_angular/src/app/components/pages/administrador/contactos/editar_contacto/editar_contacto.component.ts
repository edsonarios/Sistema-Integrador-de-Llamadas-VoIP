import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from '@models/user';
//import { UserService } from '@services/user.service';
//import { SipService } from '@services/sip.service';

@Component({
	selector: 'editar-cotacto',
	templateUrl: './editar_contacto.component.html',
//	providers: [UserService],
})
export class EditarContactoComponent implements OnInit {
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
		public modalRef: BsModalRef,
		//private serviceUser: UserService,
		//private serviceSip: SipService
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
	
	  }

	get f() {
		return this.addForm.controls;
	}

	crearcontacto() {
	
	}
	cerrar(e) {
		e.close();
	}
}
