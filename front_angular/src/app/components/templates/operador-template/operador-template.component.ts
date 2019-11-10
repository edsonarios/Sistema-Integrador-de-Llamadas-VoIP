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
	hide=0;
	public datoNumber;
	public menu = 0;
	public formSala = 0;
	user: User;
	public sala;

	wrong = false;
	public identity: Record<string, any>;
	addForm: FormGroup;
	loading = false;
	submitted = false;
	returnUrl: string;

	modalRef: BsModalRef;
	constructor(private modalService: BsModalService, private formBuilder: FormBuilder) {/*
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

		this.submit();
		// this.addContact();
		this.addForm = this.formBuilder.group({
			nombre: ['', Validators.required],
			apellido: ['', Validators.required],
			alias: ['', Validators.required],
			tipo: ['', Validators.required],
			telnumero: ['', Validators.required],
			descripcion: ['', Validators.required]
		});
	}
	OpenMenu() {
		if (this.formSala == 1) {
			this.formSala = 0;
		}
		if (this.menu == 1) {
			this.menu = 0;
		} else {
			this.menu = 1;
		}
	}
	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
	}
	LoaderPage(funtion) {
	if (funtion=='page') {
		this.hide=1;	
	}else{
		if (funtion=='operational') {
			this.hide=0;
		}
	}

	}
	DialPadComponent() {
		this.modalRef = this.modalService.show(DialPadComponent);
	}
	
	submit() {}

	get f() {
		return this.addForm.controls;
	}

	addContact() {
		if (this.addForm.invalid) {
			return;
		}
	}
	datosSala(id, nombre, descripcion) {
		window.alert(
			`ID ${id}\nNombre: ${nombre}\nDescripcion:${descripcion}\nListo para recibir metodos!`
		);
	}
	DialPad(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
		// window.alert('pendiente');
	}
	settings() {
		window.alert('pendiente plox');
	}
	addSala() {
		if (this.menu == 1) {
			this.menu = 0;
		}
		if (this.formSala == 1) {
			this.formSala = 0;
		} else {
			this.formSala = 1;
		}
	}
}
