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
				response.forEach(element => {
					var obj = element.name;
					if (obj.toLowerCase.indexOf('radio') == 0) this.radios.push(obj);
				});
			},
			er => console.log(er)
		);
	}
}
