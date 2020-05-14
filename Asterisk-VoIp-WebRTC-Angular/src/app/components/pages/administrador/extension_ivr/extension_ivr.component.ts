import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SipService } from '@services/sip.service';

@Component({
	selector: 'extension_ivr',
	templateUrl: './extension_ivr.component.html',
		providers: [SipService]
})
export class ExtensionIvrComponent implements OnInit {
public Extensions;
	constructor(
		private router: Router,
		private serviceSip: SipService,
	) {
		this.obtenerExtensiones();
	}

	ngOnInit() {
		
	}
	obtenerExtensiones(){
		this.serviceSip.obtenerAllExtensions()
	   .subscribe(
	   response	 => {
	   	this.Extensions=response;
		   console.log(response);
	   },
	   er => console.log(er)
	   );
	}

}
