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
		console.log('Componente formulario cargado');
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
					console.log(data.result.id);
					if (data.result.tipo == 'root') {
						this.router.navigate(['/Operador/Contactos']);
						console.log('entramos !!!' + data.status);
					}
					if (data.result.tipo == 'standard') {
						this.router.navigate(['/Operador/Contactos']);
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

		/* this.username = 'root@root';
    this.password = '1234';
    this.user = new User('', '', '', '', '', '', 'root@root', '1234', false, '');
    this.userService.login(this.user).subscribe(
      result => {
        this.identity = result;
        console.log(this.identity);
        console.log(result.result.id);
        if (result.result.tipo == 'root') {
          this.router.navigate(['/Operador/Contactos']);
        }

        //this.router.navigate(['/Operador/Contactos']);
      },
      error => {
        this.status = 'denied';
        console.log('error...' + error);
      }
    ); */
	}
	// Issues list
	mostrar() {
		return this.userService.datosPrueba().subscribe(res => {
			console.log(res);
		});
	}
}
