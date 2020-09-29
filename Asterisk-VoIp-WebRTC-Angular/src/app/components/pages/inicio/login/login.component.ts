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
    public conected = false;

    public Sip_Iax = [[{ default: '0' }], [{ default: '1' }]];

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

    get f() {
        return this.loginForm.controls;
    }

    enviar(e) {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }

        this.user = new User('', '', '', '', '', this.f.username.value, this.f.password.value, '');
        this.loading = true;
        this.userService
            .login(this.user)
            .pipe(first())
            .subscribe(
                (data) => {
                    this.identity = data;
                    this.user.usuarioId = data.result.id;
                    this.user.nombre = data.result.nombre;
                    this.user.apPaterno = data.result.apPaterno;
                    this.user.apMaterno = data.result.apMaterno;
                    this.user.correo = data.result.correo;
                    this.user.salaId = data.result.salaId;
                    this.user.direccion = data.result.direccion;
                    this.user.tipo = data.result.tipo;
                    this.user.telefono = data.result.telefono;
                    this.user.password = data.result.password;
                    //Guarda en un objeto al usuario
                    localStorage.setItem('Usuario', JSON.stringify(this.user));
                    this.guardarSipsLocalStorage(this.user.usuarioId);
                },
                (error) => {
                    this.submitted = false;
                    this.loading = false;
                    if (error.indexOf('404') > 0) {
                        console.log('error 404    USUARIO O CONTRASEÑA INCORRECTOS');
                        this.wrong = true;
                    }
                }
            );
    }
    mostrar() {
        return this.userService.datosPrueba().subscribe((res) => {
            console.log(res);
        });
    }

    guardarSipsLocalStorage(idUsuario) {
        this.sipService.llenarSIPsYIAX(idUsuario).subscribe(
            (response) => {
                //console.log(response);
                localStorage.setItem('Sips_Iaxs', JSON.stringify(response));
                this.Sip_Iax = response;
                //console.log(this.Sip_Iax);
                if (response[0].length == 0 && response[1].length == 0) {
                    this.conected = true;
                    console.log('Entra y cambia el valor a TRUE');
                    if (this.user.tipo == 'admin') {
                        this.router.navigate(['/Administrador/Cuentas']);
                        console.log('Entro como Administrador');
                    } else {
                        this.router.navigate(['/Login']);
                    }
                } else {
                    localStorage.setItem('NumberSelected', response[0][0]['callerid']);
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
            },
            (er) => console.log(er)
        );
    }
}
