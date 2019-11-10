"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var user_service_1 = require("@services/user.service");
var operators_1 = require("rxjs/operators");
var forms_1 = require("@angular/forms");
// import { Sala } from '../../../models/sala';
var user_1 = require("@models/user");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, userService, formBuilder // public salamodel: Sala,
    ) {
        this.router = router;
        this.userService = userService;
        this.formBuilder = formBuilder;
        this.wrong = false;
        this.loading = false;
        this.submitted = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        console.log('Componente formulario cargado');
        // this.mostrar()
        this.loginForm = this.formBuilder.group({
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
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
        this.user = new user_1.User('', '', '', '', '', '', this.f.username.value, this.f.password.value, false, '');
        this.loading = true;
        this.userService
            .login(this.user)
            .pipe(operators_1.first())
            .subscribe(function (data) {
            _this.identity = data;
            console.log(_this.identity);
            console.log(data.result.id);
            if (data.result.tipo == 'root') {
                _this.router.navigate(['/Operador/Historial']);
                console.log('entramos !!!' + data.status);
            }
            if (data.result.tipo == 'standard') {
                _this.router.navigate(['/Operador/Historial']);
            }
            else {
            }
        }, function (error) {
            _this.submitted = false;
            _this.loading = false;
            if (error.indexOf('404') > 0) {
                console.log('error 404    USUARIO O CONTRASEÑA INCORRECTOS');
                _this.wrong = true;
            }
        });
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
    };
    // Issues list
    LoginComponent.prototype.mostrar = function () {
        return this.userService.datosPrueba().subscribe(function (res) {
            console.log(res);
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            user_service_1.UserService,
            forms_1.FormBuilder // public salamodel: Sala,
        ])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
