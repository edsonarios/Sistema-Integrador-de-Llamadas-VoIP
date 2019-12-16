import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '@services/user.service';
import { SipService } from '@services/sip.service';
import { User } from '@models/user';

@Component({
	selector: 'DetalleContacto',
	templateUrl: './detalle_contacto.component.html',
	providers: [UserService, SipService]
})
export class DetalleContactoComponent implements OnInit {
	public Contact= User;
	public Sip_Iax=[];
	public identy;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private serviceUser: UserService,
		private serviceSip: SipService) {


			this.identy = this.route.snapshot.paramMap.get('id');
			this.llenarform(this.route.snapshot.paramMap.get('id'));
			this.llenarSIPsYIAX(this.route.snapshot.paramMap.get('id'));
			
	}

	ngOnInit() {
		console.log(this.Contact);
	}

	llenarform( identy){
		this.serviceUser.findByIdUsuario(identy)
		.subscribe(
		response => {	
			console.log(response);
			this.Contact = response;
		},
		er => console.log(er),
		() => console.log('terminado')
		);	
	}
	
	llenarSIPsYIAX( identy){
		this.serviceSip.llenarSIPsYIAX(identy)
		.subscribe(
		response => {	
			console.log('los sips y iax son:    ');
			console.log(response);
			this.Sip_Iax=response;
		},
		er => console.log(er),
		() => console.log('terminado')
		);	
	}

}
