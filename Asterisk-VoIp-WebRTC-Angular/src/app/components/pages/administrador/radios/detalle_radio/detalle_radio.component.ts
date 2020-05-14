import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SipService } from '@services/sip.service';
import { SalaService } from '@services/sala.service';

import Swal from 'sweetalert2';

@Component({
	selector: 'detalleRadio',
	templateUrl: './detalle_radio.component.html',
		providers: [SipService,SalaService]
})
export class DetalleRadioComponent implements OnInit {
public Radio;
public Sip="none";
	constructor(
		private router: Router,
		private sipservice: SipService,
		private serviceSala: SalaService
	) {

		this.Radio=JSON.parse(localStorage.getItem('Radio'));
		this.obtenerSipRadio();
	}

	ngOnInit() {
		
	}
	obtenerSipRadio(){
		this.sipservice.ObtenerUsuarioContexto(this.Radio.ContextRadio)
	   .subscribe(
	   response	 => {
		   console.log(response);
		   if (response[1].length==0) {
		   //	console.log('No tiene SIP');
		   }
		   else{
		   	//console.log('Si tiene SIP');
		   	this.Sip=response[1][0]['callerid'];
		   }
	   },
	   er => console.log(er)
	   );
	}
	EliminarRadio(){
		Swal.fire({
			title: 'Esta seguro de eliminar la Radio?',
			text: 'Los datos y el numero SIP desapareceran',
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
					  title: 'Radio Eliminada',
					  showConfirmButton: false,
					  timer: 1500,
					 }
				    )

				this.serviceSala.deleteSala(this.Radio.ContextRadio)
			  .subscribe(
	 			response => {
			  console.log('Eliminado');
	 			},
	 			error => console.log(error));
			  this.router.navigate(['/Administrador/Radios']);
				
			}
		});



	}

}
