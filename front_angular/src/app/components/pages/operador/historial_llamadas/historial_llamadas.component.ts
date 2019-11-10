import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'Historial-Llamadas',
	templateUrl: './historial_llamadas.component.html'
})
export class HistorialLlamadasComponent implements OnInit {
	public Historial;
	constructor(private router: Router) {
		this.Historial = [
			{
				Nombre: 'Daniel',
				Numero: '3001',
				Tipo: 'Entrante',
				Origen: 'Caja',
				Destino: 'Patrulla',
				Duracion: '02:30 min',
				Fecha: '05/02/2019',
				Audio: 'jfdsafdsajp1321.wmp'
			},
			{
				Nombre: 'Daniel',
				Numero: '3001',
				Tipo: 'Saliente',
				Origen: 'Caja',
				Destino: 'Patrulla',
				Duracion: '02:30 min',
				Fecha: '05/02/2019',
				Audio: 'jfdsafdsajp1321.wmp'
			},
			{
				Nombre: 'Daniel',
				Numero: '3001',
				Tipo: 'Entrante',
				Origen: 'Caja',
				Destino: 'Patrulla',
				Duracion: '02:30 min',
				Fecha: '05/02/2019',
				Audio: 'jfdsafdsajp1321.wmp'
			},
			{
				Nombre: 'Daniel',
				Numero: '3001',
				Tipo: 'Perdida',
				Origen: 'Caja',
				Destino: 'Patrulla',
				Duracion: '02:30 min',
				Fecha: '05/02/2019',
				Audio: 'jfdsafdsajp1321.wmp'
			},
			{
				Nombre: 'Daniel',
				Numero: '3001',
				Tipo: 'Entrante',
				Origen: 'Caja',
				Destino: 'Patrulla',
				Duracion: '02:30 min',
				Fecha: '05/02/2019',
				Audio: 'jfdsafdsajp1321.wmp'
			},
			{
				Nombre: 'Daniel',
				Numero: '3001',
				Tipo: 'Saliente',
				Origen: 'Caja',
				Destino: 'Patrulla',
				Duracion: '02:30 min',
				Fecha: '05/02/2019',
				Audio: 'jfdsafdsajp1321.wmp'
			},
			{
				Nombre: 'Daniel',
				Numero: '3001',
				Tipo: 'Saliente',
				Origen: 'Caja',
				Destino: 'Patrulla',
				Duracion: '02:30 min',
				Fecha: '05/02/2019',
				Audio: 'jfdsafdsajp1321.wmp'
			},
			{
				Nombre: 'Daniel',
				Numero: '3001',
				Tipo: 'Perdida',
				Origen: 'Caja',
				Destino: 'Patrulla',
				Duracion: '02:30 min',
				Fecha: '05/02/2019',
				Audio: 'jfdsafdsajp1321.wmp'
			},
			{
				Nombre: 'Daniel',
				Numero: '3001',
				Tipo: 'Entrante',
				Origen: 'Caja',
				Destino: 'Patrulla',
				Duracion: '02:30 min',
				Fecha: '05/02/2019',
				Audio: 'jfdsafdsajp1321.wmp'
			}
		];
	}

	ngOnInit() {}
}
