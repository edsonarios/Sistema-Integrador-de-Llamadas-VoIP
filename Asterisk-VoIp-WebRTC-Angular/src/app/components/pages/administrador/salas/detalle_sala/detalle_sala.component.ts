import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalaService } from '@services/sala.service';

@Component({
	selector: 'detalleSala',
	templateUrl: './detalle_sala.component.html',
	providers: [SalaService]
})
export class DetalleSalaComponent implements OnInit {
private Nombre;
private Descripcion;
private Habilitado;
private Sala;
	constructor(
		private router: Router,
		private serviceSala: SalaService
	) {
		this.Sala=JSON.parse(localStorage.getItem('Sala'));
		this.Nombre=this.Sala.ContextSala;
		this.Descripcion=this.Sala.descripcion;
		this.Habilitado=this.Sala.Switch;
	}

	ngOnInit() {
		this.ObtenerSipAndIax();
	}
	ObtenerSipAndIax(){
		console.log('Entra');
		this.serviceSala.ParticipantesSala(this.Nombre).subscribe(
			response => {
				console.log(response);
				console.log('Logintud :'+response.length);
			},
			er => console.log(er),
			() => console.log('terminado')
		);
	}
	eliminarSala(){
			this.serviceSala.deleteSala(this.Nombre)
			  .subscribe(
	 			response => {
			  console.log('Eliminado');
	 			},
	 			error => console.log(error));
			  this.router.navigate(['/Administrador/Salas']);
	}
}
