import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
	constructor(
		private router: Router,
		public userService: UserService,
		private formBuilder: FormBuilder // public salamodel: Sala,
	) {}

	ngOnInit() {
		// this.mostrar()
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
			'',
			this.f.username.value,
			this.f.password.value,
			false,
			''
		);
		this.loading = true;
		this.userService
			.login(this.user)
			.pipe(first())
			.subscribe(
				data => {
					this.identity = data;
					console.log(this.identity);
<<<<<<< HEAD
					console.log(data.result.id);
					localStorage.setItem("idUser", data.result.id);
					if (data.result.tipo == 'root') {
						this.router.navigate(['/Operador/Contactos']);
						console.log('entramos !!!' + data.status);
=======
					//console.log(data.result.id);
					if (data.result.tipo == 'admin') {
						this.router.navigate(['/Administrador/Contactos']);
						console.log('entramos como admin!!!' + data.status);
>>>>>>> origin/master
					}
					if (data.result.tipo == 'standard') {
						this.router.navigate(['/Operador/Historial']);
					console.log('entramos  como operador!!!' + data.status);
					} else {
					}
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

	}
	// Issues list
	mostrar() {
		return this.userService.datosPrueba().subscribe(res => {
			console.log(res);
		});
	}
}
