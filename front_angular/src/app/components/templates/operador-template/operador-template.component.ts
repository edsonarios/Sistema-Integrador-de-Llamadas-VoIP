import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from 'models/user';
// import { Sala } from '../../../../models/sala';
import { Entrance, Quit } from 'services/animations';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// import { DialPadComponent } from '../../pages/operador/dialpad/dialpad.component';
import { DialPadComponent } from '@operador/dialpad/dialpad.component';


import {interval, timer } from 'rxjs';
@Component({
	selector: 'operador-template',
	templateUrl: './operador-template.component.html',
	animations: [Entrance,Quit]
})
export class OperadorTemplateComponent implements OnInit {

public Llamada;
	

	private Hide:boolean= true;
	private datoNumber;
	user: User;
	private sala;

	public Salas;


	modalRef: BsModalRef;
	constructor(private modalService: BsModalService, private formBuilder: FormBuilder) {
		this.Salas=[
		{'nombre':'Sala 1','id':'1','Dimesions':'10','Ocupando':'2'},
		{'nombre':'Sala 2','id':'2','Dimesions':'5','Ocupando':'1'},
		{'nombre':'Emergencias 1','id':'3','Dimesions':'5','Ocupando':'3'},
		{'nombre':'Emergencias 2','id':'4','Dimesions':'5','Ocupando':'0'},
		{'nombre':'Emergencia 3','id':'5','Dimesions':'5','Ocupando':'1'},
		{'nombre':'Radio 1','id':'6','Dimesions':'4','Ocupando':'4'},
		{'nombre':'Radio 2','id':'7','Dimesions':'2','Ocupando':'0'}
		];

		this.Llamada=[
		{'nombre':'Richard','id':'1','numero':'3001','Tipo':'Llamada','Estado':'Inactiva'},
		//{'nombre':'Sala PTT','id':'2','numero':'3002','Tipo':'Sala','Estado':'Activa'},
		//{'nombre':'Sala PTT','id':'3','numero':'3003','Tipo':'Sala','Estado':'Inactiva'},
		//{'nombre':'Sala 2','id':'4','numero':'3005','Tipo':'Llamada','Estado':'Inactiva'},
		//{'nombre':'Sala 4','id':'5','numero':'3004','Tipo':'Llamada','Estado':'Inactiva'},
		//{'nombre':'Sala 3','id':'6','numero':'3006','Tipo':'Llamada','Estado':'Inactiva'}
		];

		console.log(this.Salas)
		//const contador=interval(1000);

		/*contador.subscribe((n)=>{
			this.datoNumber=this.ConvertirTiempo(n);
			//console.log('Dato Number :'+n);
		});*/

	}
	ngOnInit() {
		this.sala = [
			{ nombreSala: 'Sala 1', descripcion: 'Descripcion', usuarioId: '1' },
			{ nombreSala: 'Sala 2', descripcion: 'Descripcion2', usuarioId: '2' },
			{ nombreSala: 'Sala 3', descripcion: 'Descripcion3', usuarioId: '3' }
		];

		this.user = {
			nombre: 'usuario',
			apPaterno: 'userPat',
			apMaterno: 'userMat',
			tipo: 'Operador',
			direccion: 'Prueba',
			telefono: '12345',
			correo: 'ope@operador',
			password: '1234',
			conectado: true,
			salaId: '1'
		};
	}
	LoaderPage(funtion) {
		if (funtion=='page') {
			this.Hide=false;	
		}else{
			if (funtion=='operational') {
				this.Hide=true;
			}
		}
	}
	procesaPropagar(nombre) {
  //	console.log(nombre);
  	console.log('Recibido : '+ nombre['nombre']);
  	console.log('Recibido : '+ nombre['id']);
  	this.Llamada.push({'nombre':'Sala 2','id':'4','numero':'3005','Tipo':'Llamada','Estado':'Inactiva'});
  		
	}
	DialPadComponent() {
		this.modalRef = this.modalService.show(DialPadComponent);
	}
	ConvertirTiempo(tiempo){
		//  PENDIENTE
		/*var Hora= parseInt((tiempo/3600),0);
		var minutos=parseInt((tiempo-(Hora*3600))/60);
		var segundos= tiempo-(Hora*3600)-(minutos*60);
		if (segundos<10) {
			var sec='0'+segundos;
		}
		if (minutos<10) {
			var min='0'+minutos;
		}
		if (Hora<10) {
			var Hor='0'+Hora;
		}
			var Timer= Hora+':'+minutos+':'+segundos;
		return Timer;*/
	}
}
