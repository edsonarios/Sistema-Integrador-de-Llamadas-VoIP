import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { first } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { SipService } from '@services/sip.service';
// import { Sala } from '../../../models/sala';
import { User } from '@models/user';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, userService, sipService, formBuilder // public salamodel: Sala,
    ) {
        this.router = router;
        this.userService = userService;
        this.sipService = sipService;
        this.formBuilder = formBuilder;
        this.wrong = false;
        this.loading = false;
        this.submitted = false;
        this.conected = false;
        this.Sip_Iax = [[{ 'default': '0' }], [{ 'default': '1' }]];
    }
    LoginComponent.prototype.ngOnInit = function () {
        // this.mostrar()
        localStorage.clear();
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    };
    Object.defineProperty(LoginComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () {
            return this.loginForm.controls;
        },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.enviar = function (e) {
        var _this = this;
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.user = new User('', '', '', '', '', this.f.username.value, this.f.password.value);
        this.loading = true;
        this.userService
            .login(this.user)
            .pipe(first())
            .subscribe(function (data) {
            _this.identity = data;
            //console.log(this.identity);
            // >>>>>>>>>HEAD	
            _this.user.usuarioId = data.result.id;
            _this.user.nombre = data.result.nombre;
            _this.user.apPaterno = data.result.apPaterno;
            _this.user.apMaterno = data.result.apMaterno;
            _this.user.correo = data.result.correo;
            _this.user.salaId = data.result.salaId;
            _this.user.direccion = data.result.direccion;
            _this.user.tipo = data.result.tipo;
            _this.user.telefono = data.result.telefono;
            _this.user.password = data.result.password;
            //Guarda en un objeto al usuario
            localStorage.setItem('Usuario', JSON.stringify(_this.user));
            _this.guardarSipsLocalStorage(_this.user.usuarioId);
            //this.Sip_Iax=JSON.parse(localStorage.getItem('Sips&Iaxs'));
            if (_this.user.tipo == 'standard') {
                _this.conected = true;
            }
            else {
                if (_this.user.tipo == 'root') {
                    _this.router.navigate(['/Administrador/Contactos']);
                    console.log('Entro como Root');
                }
                if (_this.user.tipo == 'admin') {
                    _this.router.navigate(['/Administrador/Contactos']);
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
        }, function (error) {
            _this.submitted = false;
            _this.loading = false;
            if (error.indexOf('404') > 0) {
                console.log('error 404    USUARIO O CONTRASEÑA INCORRECTOS');
                _this.wrong = true;
            }
        });
    };
    ;
    // Issues list
    LoginComponent.prototype.mostrar = function () {
        return this.userService.datosPrueba().subscribe(function (res) {
            console.log(res);
        });
    };
    LoginComponent.prototype.guardarSipsLocalStorage = function (idUsuario) {
        var _this = this;
        this.sipService.llenarSIPsYIAX(idUsuario)
            .subscribe(function (response) {
            //console.log(response);
            localStorage.setItem('Sips_Iaxs', JSON.stringify(response));
            _this.Sip_Iax = response;
            console.log(_this.Sip_Iax);
        }, function (er) { return console.log(er); });
    };
    LoginComponent.prototype.SeleccionarSip_Iax = function (Sip_Iax) {
        localStorage.setItem('NumberSelected', Sip_Iax);
        if (this.user.tipo == 'root') {
            this.router.navigate(['/Administrador/Contactos']);
            console.log('Entro como Root');
        }
        if (this.user.tipo == 'admin') {
            this.router.navigate(['/Administrador/Contactos']);
            console.log('Entro como Administrador');
        }
        if (this.user.tipo == 'standard') {
            this.router.navigate(['/Operador/Historial']);
            console.log('Entro como Operador');
        }
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html'
        }),
        __metadata("design:paramtypes", [Router,
            UserService,
            SipService,
            FormBuilder // public salamodel: Sala,
        ])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//    localStorage.setItem('Usuarios',JSON.stringify(this.Usuarios));
//		console.log(JSON.parse(localStorage.getItem('Usuarios')));
