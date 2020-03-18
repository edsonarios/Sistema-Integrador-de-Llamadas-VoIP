import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SipService } from '../../../../../services/sip.service';

@Component({
	selector: 'radios',
	templateUrl: './radios.component.html',
	providers: [SipService]
})
export class RadiosComponent implements OnInit {
	public radios;

	constructor(private router: Router, private sipservice: SipService) {}

	ngOnInit() {
		this.listarRadios();
	}

	listarRadios() {
		this.sipservice.findAllSip().subscribe(
			response => {
				console.log('Estos son los Sips existentes... \n');
				this.radios = response;
				console.log(this.radios);
			},
			er => console.log(er)
		);
	}
}
