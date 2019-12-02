import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'salas',
	templateUrl: './salas.component.html'
})
export class SalasComponent implements OnInit {
	public Salas=[
		{
			'nombre':'Sala 1',
			'id':'1',
			'Dimesions':'10',
			'Ocupando':'2',
			'Numero':'3001'
		},
		{
			'nombre':'Sala 2',
			'id':'2',
			'Dimesions':'5',
			'Ocupando':'1',
			'Numero':'3002'
		},
		{
			'nombre':'Emergencias 1',
			'id':'3',
			'Dimesions':'5',
			'Ocupando':'3',
			'Numero':'3003'
		},
		{
			'nombre':'Emergencias 2',
			'id':'4',
			'Dimesions':'5',
			'Ocupando':'0',
			'Numero':'3004'
		},
		{
			'nombre':'Emergencia 3',
			'id':'5',
			'Dimesions':'5',
			'Ocupando':'1',
			'Numero':'3005'
		},
		{
			'nombre':'Radio 1',
			'id':'6',
			'Dimesions':'4',
			'Ocupando':'4',
			'Numero':'3006'
		},
		{
			'nombre':'Radio 2',
			'id':'7',
			'Dimesions':'2',
			'Ocupando':'0',
			'Numero':'3007'
		}
		];
	constructor(private router: Router) {
	}

	ngOnInit() {
		console.log(this.Salas);
	}
	
}
