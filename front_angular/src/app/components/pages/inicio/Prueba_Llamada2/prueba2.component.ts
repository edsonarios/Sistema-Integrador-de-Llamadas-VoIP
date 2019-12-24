import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'Pruebas2',
	templateUrl: './prueba2.component.html'
})
// componente para realizar todas las pruebas respecto a las llamadas
// IP: 18.216.202.26
// NumerosSIP: 6001, 6002, 7001, 7000
// NumeroWebrtc: 7010,7011,7012


export class Prueba2Component implements OnInit {
	public SIP;
	constructor()
	{
		//Evolution: Creo que el dominio de aca abajo esta mal 
		
        this.SIP={'Numero':'7001','Password':'7001','Dominio':'18.215.202.26'}
    }
	ngOnInit() {
	
	}

	

}
