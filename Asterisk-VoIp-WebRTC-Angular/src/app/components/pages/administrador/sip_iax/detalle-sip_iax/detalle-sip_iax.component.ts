import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'sip_iax-detalle',
	templateUrl: './detalle-sip_iax.component.html'
})
export class SIP_IaxDetalleComponent implements OnInit {
	public Sip_Iax;

	constructor(private router: Router) {
		this.Sip_Iax=JSON.parse(localStorage.getItem('SIP_IAX'));
	}

	ngOnInit() {
	}
	
}
