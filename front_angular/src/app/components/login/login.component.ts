import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../sass/main.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  Autentificador(e){
  	console.log("Carga");
  	
  	this.router.navigate(['/Operador/Contactos']);
  }
}
