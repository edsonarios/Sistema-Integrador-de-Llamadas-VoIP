import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SipService } from '@services/sip.service';

// import { Sala } from '../../../models/sala';
import { User } from '@models/user';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
	public wrong = false;
	public identity: Object;
	loginForm: FormGroup;
	loading = false;
	submitted = false;
	returnUrl: string;
	user: User;
	public conected=false;

	public Sip_Iax=[[{'default':'0'}],[{'default':'1'}]];
	
	constructor(
		private router: Router,
		public userService: UserService,
		public sipService: SipService,
		private formBuilder: FormBuilder // public salamodel: Sala,
		
	) {}

	ngOnInit() {
		// this.mostrar()
		localStorage.clear();
		
		this.loginForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.loginForm.controls;
	}

	enviar(e) {
		this.submitted = true;
		// stop here if form is invalid
		if (this.loginForm.invalid) {
			return;
		}

		
		this.user = new User(
			'',
			'',
			'',
			'',
			'',
			this.f.username.value,
			this.f.password.value
		);
		this.loading = true;
		this.userService
			.login(this.user)
			.pipe(first())
			.subscribe(
				data => {
					this.identity = data;
					//console.log(this.identity);
// >>>>>>>>>HEAD	
					this.user.usuarioId=data.result.id;
					this.user.nombre=data.result.nombre;
					this.user.apPaterno=data.result.apPaterno;
					this.user.apMaterno=data.result.apMaterno;
					this.user.correo=data.result.correo;
					this.user.salaId=data.result.salaId;
					this.user.direccion=data.result.direccion;
					this.user.tipo=data.result.tipo;
					this.user.telefono=data.result.telefono;
					this.user.password=data.result.password;
	//Guarda en un objeto al usuario
					localStorage.setItem('Usuario',JSON.stringify(this.user));
					this.guardarSipsLocalStorage(this.user.usuarioId);

					//this.Sip_Iax=JSON.parse(localStorage.getItem('Sips&Iaxs'));
					if(this.user.tipo =='standard'){
						this.conected=true;
					}
					else{
						if (this.user.tipo == 'root') {
						this.router.navigate(['/Administrador/Cuentas']);
						console.log('Entro como Root');
						}
						if (this.user.tipo == 'admin') {
						this.router.navigate(['/Administrador/Cuentas']);
						console.log('Entro como Administrador');
						}
					}
					
					/*
					if (data.result.tipo == 'root') {
						this.router.navigate(['/Operador/Contactos']);
						console.log('entramos !!!' + data.status);
					}
//=======
					//console.log(data.result.id);
					if (data.result.tipo == 'admin') {
						this.router.navigate(['/Administrador/Contactos']);
						console.log('entramos como admin!!!' + data.status);
//>>>>>>> origin/master
					}
					if (data.result.tipo == 'standard') {
						this.router.navigate(['/Operador/Historial']);
					console.log('entramos  como operador!!!' + data.status);
					} else {
					}*/
				},
				error => {
					this.submitted = false;
					this.loading = false;
					if (error.indexOf('404') > 0) {
						console.log('error 404    USUARIO O CONTRASEÑA INCORRECTOS');
						this.wrong = true;
					}
				}
			);

	};
	// Issues list
	mostrar() {
		return this.userService.datosPrueba().subscribe(res => {
			console.log(res);
		});
	}

	guardarSipsLocalStorage(idUsuario){
			this.sipService.llenarSIPsYIAX(idUsuario)
			.subscribe(
			response => {	
				
				//console.log(response);
				localStorage.setItem('Sips_Iaxs',JSON.stringify(response));
				this.Sip_Iax=response;
				console.log(this.Sip_Iax);
				
			},
			er => console.log(er)
			);	
		
	}
	SeleccionarSip_Iax(Sip_Iax){
		localStorage.setItem('NumberSelected',Sip_Iax);

		if (this.user.tipo == 'root') {
			this.router.navigate(['/Administrador/Cuentas']);
			console.log('Entro como Root');
		}
		if (this.user.tipo == 'admin') {
			this.router.navigate(['/Administrador/Cuentas']);
			console.log('Entro como Administrador');
		}
		if (this.user.tipo == 'standard') {
			this.router.navigate(['/Operador/Historial']);
			console.log('Entro como Operador');
		}

	}
}

//    localStorage.setItem('Usuarios',JSON.stringify(this.Usuarios));
//		console.log(JSON.parse(localStorage.getItem('Usuarios')));