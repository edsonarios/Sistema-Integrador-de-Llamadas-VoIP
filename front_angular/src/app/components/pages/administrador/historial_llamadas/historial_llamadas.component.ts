import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistorialService } from '@services/historial.service';

import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
	selector: 'Historial-Llamadas',
	templateUrl: './historial_llamadas.component.html'
})
export class HistorialLlamadasComponent implements OnInit {
	public Historial;

	searchdate: string;
	searchcontact: string;

	public Todos = [];
	public History = [];
	public Ocupado = [];
	public Entrante = [];
	public Perdida = [];
	public Xfecha = [];
	public Xcontacto = [];

	swH: Boolean;
	swO: Boolean;
	swE: Boolean;
	swP: Boolean;

	constructor(private hllamadas: HistorialService, private router: Router) {
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

	todos() {
		this.swH = false;
		console.log(this.swH);
		this.History = this.Todos;
	}

	cambio() {
		this.History = this.Ocupado;
		this.swH = false;
	}

	//// ojo
	saliente() {
		this.History = this.Ocupado;
		this.swH = false;
	}

	entrante() {
		this.History = this.Entrante;
		this.swH = false;
	}

	perdida() {
		this.History = this.Perdida;
		this.swH = false;
	}

	historial() {
		this.hllamadas.HistorialLlamadas().subscribe(
			response => {
				console.log('Historial de llamadas... \n');
				this.History = response;
				this.Todos = response;

				this.History.forEach(element => {
					var segun = element.billsec + '';
					if (segun.length == 1) element.billsec = '0' + element.billsec;
					element.calldate =
						moment(element.calldate)
							.subtract(10, 'days')
							.calendar() +
						'\n ( ' +
						moment(element.calldate).format('LTS') +
						' )';
				});

				// this.History.forEach(element => {
				// 	console.log(element);
				// });

				this.History.forEach(element => {
					if (element.disposition == 'ANSWERED') this.Entrante.push(element);
					if (element.disposition == 'NO ANSWERED') this.Perdida.push(element);
					if (element.disposition == 'BUSY') this.Ocupado.push(element);
				});
			},
			er => console.log(er)
		);
	}

	salientes() {
		this.hllamadas.HistorialLlamadas().subscribe(
			response => {
				console.log('Historial de llamadas... \n');
				this.History = response;

				this.History.forEach(element => {
					if (element.disposition == 'ANSWERED') this.Entrante.push(element);
					if (element.disposition == 'NO ANSWERED') this.Perdida.push(element);
					if (element.disposition == 'BUSY') this.Ocupado.push(element);
				});

				// this.History.forEach(element => {
				//   console.log(element.disposition);
				// });

				console.log('LLAMADAS ENTRANTES...');
				this.Entrante.forEach(element => {
					console.log(element.disposition);
				});
				console.log('LLAMADAS PERDIDAS');
				this.Perdida.forEach(element => {
					console.log(element.disposition);
				});
				console.log('LLAMADA EN OCUPADO');
				this.Ocupado.forEach(element => {
					console.log(element.disposition);
				});
			},
			er => console.log(er)
		);
	}

	buscar() {
		this.Xfecha = [];
		this.Xcontacto = [];
		console.log(this.searchdate);

		console.log(this.searchcontact);

		this.Todos.forEach(element => {
			if (
				moment(element.calldate)
					.subtract(10, 'days')
					.calendar() ==
				moment(this.searchdate)
					.subtract(10, 'days')
					.calendar()
			)
				this.Xfecha.push(element);

			var aux = element.clid + '';

			// console.log(aux.indexOf('<'));
			// console.log(aux.indexOf('>'));

			// console.log(aux.substring(aux.indexOf('<') + 1, aux.indexOf('>')));
			var aux2 = aux.substring(aux.indexOf('<') + 1, aux.indexOf('>'));
			if (aux2 == this.searchcontact) {
				this.Xcontacto.push(element);
			}
		});

		if (this.Xfecha.length == 0 || this.Xcontacto.length == 0) {
			//alert --> No existe entradas para buscar
			Swal.fire('Nada..!', "No se encontró entradas, para buscarlas", 'warning');
		}

		this.History = this.Xfecha;
		this.swH = false;
	}

	notFound() {
		Swal.fire('Hey user!', "I don't like you.", 'warning');
		// Swal({
		// 	title: 'Error!',
		// 	text: 'Hola mundo.!',
		// 	type: 'error'
		// });
	}

	onChange(event) {
		console.log(event);
	}

	ngOnInit() {
		this.historial();
	}
	cssch() {
		document.getElementById('nav').style.cssText = 'background: red;';
	}
}
