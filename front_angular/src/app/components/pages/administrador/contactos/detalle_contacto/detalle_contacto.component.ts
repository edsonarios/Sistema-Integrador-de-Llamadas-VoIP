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
	public Contacto;
	public Contact: User;
	public identy;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private serviceUser: UserService,
		private serviceSip: SipService) {

			this.identy = this.route.snapshot.paramMap.get('id');
			this.llenarform(this.route.snapshot.paramMap.get('id'));
			this.llenarSIPsYIAX(this.route.snapshot.paramMap.get('id'));
			
		this.Contacto={
				
					'Id':'1',
					'Nombre':'Nelson Richard',
					'ApPaterno':'Cori',
					'ApMaterno':'Sirpa',
					'correo':'Richard@usuario.com',
					'Direccion':'Zona X, Calle Y #2235',
					'Nro_Telefono':'78839131',
					'Tipo':'Standar',
					'Sip':[
						{
						'Numero':'3001',
						'Alias':'3001',
						'context':'default'
						},
						{
						'Numero':'3002',
						'Alias':'3002',
						'context':'default'
						},
						{
						'Numero':'3004',
						'Alias':'3004',
						'context':'default'
						},
						{
						'Numero':'3005',
						'Alias':'3005',
						'context':'default'
						}],
					'Iax':[
						{
						'Numero':'3003',
						'Alias':'3003',
						'context':'default'
						},
						{
						'Numero':'3006',
						'Alias':'3006',
						'context':'default'
						}]
		};
	}

	ngOnInit() {
		console.log(this.Contacto);	
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
		},
		er => console.log(er),
		() => console.log('terminado')
		);	
	}

}
