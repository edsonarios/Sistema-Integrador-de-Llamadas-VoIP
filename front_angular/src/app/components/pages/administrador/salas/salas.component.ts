import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'salas',
	templateUrl: './salas.component.html'
})
export class SalasComponent implements OnInit {
	public ParticipantesSala=[
				{	
					'Id':'1',
					'Nombre':'Nelson Richard',
					'ApPaterno':'Cori',
					'ApMaterno':'Sirpa',
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
						}],
					'Iax':[
						{
						'Numero':'3003',
						'Alias':'3003',
						'context':'default'
						}]
				},
				{	
					'Id':'2',
					'Nombre':'Edson',
					'ApPaterno':'Añawaya',
					'ApMaterno':'Rios',
					'Sip':[
						{
						'Numero':'3003',
						'Alias':'3003',
						'context':'default'
						},
						{
						'Numero':'3004',
						'Alias':'3004',
						'context':'default'
						}],
					'Iax':[
						{
						'Numero':'3005',
						'Alias':'3006',
						'context':'default'
						}]
				}];

	constructor(private router: Router) {
	}

	ngOnInit() {
		console.log(this.ParticipantesSala);
	}
	
}
