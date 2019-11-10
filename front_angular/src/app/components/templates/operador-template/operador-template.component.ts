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
	private Hide:boolean= true;
	private datoNumber;
	user: User;
	private sala;

	

	modalRef: BsModalRef;
	constructor(private modalService: BsModalService, private formBuilder: FormBuilder) {
	/*
		const contador=interval(1000);

		contador.subscribe((n)=>{
			this.datoNumber=n;
			console.log('Dato Number :'+n);
		});
*/
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
	DialPadComponent() {
		this.modalRef = this.modalService.show(DialPadComponent);
	}

}
