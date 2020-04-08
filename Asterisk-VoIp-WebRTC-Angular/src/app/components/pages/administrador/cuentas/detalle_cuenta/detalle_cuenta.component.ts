import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '@services/user.service';
import { SipService } from '@services/sip.service';
import { User } from '@models/user';

import Swal from 'sweetalert2';

@Component({
	selector: 'DetalleCuenta',
	templateUrl: './detalle_cuenta.component.html',
	providers: [UserService, SipService]
})
export class DetalleCuentaComponent implements OnInit {
	public Contact= User;
	public Sip_Iax=[];
	public identy;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private serviceUser: UserService,
		private serviceSip: SipService) {

			this.identy = localStorage.getItem('idCuenta');
			this.llenarform(localStorage.getItem('idCuenta'));
			this.llenarSIPsYIAX(localStorage.getItem('idCuenta'));
			
	}

	ngOnInit() {
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
	EliminarCuenta(){
		Swal.fire({
			title: 'Esta seguro de eliminar la cuenta?',
			text: 'Los datos y los numeros asociados a la cuenta desapareceran',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Si estoy seguro'
		}).then(result => {
			if (result.value) {
				 Swal.fire({
				 		icon: 'success',
					  title: 'Cuenta Eliminada',
					  showConfirmButton: false,
					  timer: 1500,
					 }
				    )

				this.DeleteCuenta();
				 this.router.navigate(['/Administrador/Cuentas']);
			}
		});
	}
	DeleteCuenta(){
		this.serviceUser.EliminaCuenta(this.identy);
		
	}

}
