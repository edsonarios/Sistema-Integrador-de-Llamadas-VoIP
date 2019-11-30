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
        this.user = new user_1.User('', '', '', '', '', this.f.username.value, this.f.password.value);
        this.loading = true;
        this.userService
            .login(this.user)
            .pipe(operators_1.first())
            .subscribe(function (data) {
            _this.identity = data;
            console.log(_this.identity);
            // >>>>>>>>>HEAD
            console.log(data.result.id);
            localStorage.setItem("idUser", data.result.id);
            if (data.result.tipo == 'root') {
                _this.router.navigate(['/Operador/Contactos']);
                console.log('entramos !!!' + data.status);
            }
            //=======
            //console.log(data.result.id);
            if (data.result.tipo == 'admin') {
                _this.router.navigate(['/Administrador/Contactos']);
                console.log('entramos como admin!!!' + data.status);
                //>>>>>>> origin/master
            }
            if (data.result.tipo == 'standard') {
                _this.router.navigate(['/Operador/Historial']);
                console.log('entramos  como operador!!!' + data.status);
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
    };
    ;
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
