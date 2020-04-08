import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SipService } from '@services/sip.service';

@Component({
	selector: 'sip_iax',
	templateUrl: './sip_iax.component.html',
	providers: [SipService]
})
export class Sip_IaxComponent implements OnInit {

public Sip ;
	constructor(private router: Router,
				private sipservice: SipService) {
	}

	ngOnInit() {
		this.listarSip();
	}
	listarSip(){
		this.sipservice.findAllSip()
	   .subscribe(
	   response	 => {
		   //console.log('Estos son los Sips existentes... \n'); 
		   this.Sip = response;  
		   console.log(this.Sip);
	   },
	   er => console.log(er)
	   );
	   
 }	
}
