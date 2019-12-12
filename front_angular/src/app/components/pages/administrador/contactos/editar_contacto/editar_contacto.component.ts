import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '@models/user';
//import { UserService } from '@services/user.service';
//import { SipService } from '@services/sip.service';

@Component({
	selector: 'editar-cotacto',
	templateUrl: './editar_contacto.component.html',
//	providers: [UserService],
})
export class EditarContactoComponent implements OnInit {
	public identy;
	wrong = false;
	public identity: Object;
	addForm: FormGroup;
	loading = false;
	public submitted: boolean;
	returnUrl: string;
	formato: [User];

	

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private formBuilder: FormBuilder,
		//private serviceUser: UserService,
		//private serviceSip: SipService
	) {
		this.submitted = true;
		
	}
	
	ngOnInit(){
		this.identy = this.route.snapshot.paramMap.get('id');
		console.log(this.route.snapshot.paramMap.get('id'));

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
