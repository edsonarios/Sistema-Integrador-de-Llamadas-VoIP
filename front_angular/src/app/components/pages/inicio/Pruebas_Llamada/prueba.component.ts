import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'Pruebas',
    templateUrl: './prueba.component.html'
})
export class PruebaComponent {
	public Numero;
	public Password;
	public Dominio;
	constructor() {
		this.Numero = '7000';
		this.Password = '7000';
		this.Dominio = '18.216.202.26';
	}
}
