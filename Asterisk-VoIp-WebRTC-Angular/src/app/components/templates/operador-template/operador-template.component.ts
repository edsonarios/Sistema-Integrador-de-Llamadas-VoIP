import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from 'models/user';
// import { Sala } from '../../../../models/sala';
import { Entrance, Quit, DesktopAnimation, EnterLeave } from 'services/animations';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// import { DialPadComponent } from '../../pages/operador/dialpad/dialpad.component';
import { DialPadComponent } from '@operador/dialpad/dialpad.component';

import { SalaService } from '@services/sala.service';

import {interval, timer } from 'rxjs';
@Component({
	selector: 'operador-template',
	templateUrl: './operador-template.component.html',
	animations: [Entrance,Quit, DesktopAnimation, EnterLeave]
})
export class OperadorTemplateComponent implements OnInit {

public Llamada=[];
/*public Llamada=[
				{'nombre':'Prueba Llamada',
				 'numero': '3002',
				 'Tipo': 'Llamada',
				 'id':'1',
				 'Estado':'inactiva',
				},
				{'nombre':'Prueba Sala',
				 'numero': '3002',
				 'Tipo': 'Sala',
				 'id':'1',
				 'Estado':'inactiva',
				},
				{'nombre':'Prueba Radio',
				 'numero': '3002',
				 'Tipo': 'Radio',
				 'id':'1',
				 'Estado':'inactiva',
				},
				];*/
public Salas=[];
public Notificaciones=[];
public Panel=[];
public ParticipantesSala=[];

public Hide:boolean= true;
public HideLateral:boolean=true;
public OptionLateral=0;

public pages=false;

user: User;
public NumeroActual;
public HidePanel:boolean=false;

public Sip_Iax=[[],[]];

	modalRef: BsModalRef;
	constructor(private modalService: BsModalService, 
				private formBuilder: FormBuilder,
				public salaService: SalaService) {

 this.ParticipantesSala=[
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
						'Alias':'3005',
						'context':'default'
						},
						{
						'Numero':'3006',
						'Alias':'3006',
						'context':'default'
						}]
				}
				];

				this.AsignarSipsIax();
	}
	ngOnInit() {
	
		this.user = JSON.parse(localStorage.getItem('Usuario'));
		this.NumeroActual=localStorage.getItem('NumberSelected');
		this.ObtenerSalas();
		//console.log(this.user);
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
	ObtenerSalas(){
		console.log('Esta son las salas');
		this.salaService.listarSalas()
			.subscribe(
			response => {	
				
				//console.log(response);
				this.Salas=response;
				console.log(this.Salas);
			},
			er => console.log(er)
			);	
	}
	AsignarSipsIax(){
		this.Sip_Iax=JSON.parse(localStorage.getItem('Sips_Iaxs'));
	}
	SeleccionarSip_Iax(Sip_Iax){
		localStorage.setItem('NumberSelected',Sip_Iax);
		this.NumeroActual=Sip_Iax;
	}
	ChangeWindow(){
		if (this.pages==true) {
			this.pages=false;
		}
		else{
			this.pages=true;
		}
	}
	LateralOpcion(page){
	// 0 = Notificaciones
	// 1 = Mi Agenda
	// 2 = Salas
	// 3 = Mi Pefil (puede cambiar de numeros)
	this.OptionLateral=page;
	}
	
	AgregarEventoNotificacion(){
		// Metodo donde se asigna de forma aleatorea en el panel de notificaciones
		this.OptionLateral=0;
		var numero= Math.round((Math.random() * (3020 - 3000) + 3000));
		var id= Math.round((Math.random()*(20-11)+11));
		this.Notificaciones.push({'nombre':'Alias','numero':numero,'estado':'entrante','id':id});
	}
	AgregarEventoPanel(numero,fecha,duracion,tipo){
		//metodo en el que agregamos una nueva tupla en el panel de estados

		var horaNow = this.ObtenerTiempo();
		this.Panel.push({'tipo':tipo,'Numero':numero,'fecha':fecha,'Hora':horaNow,'tiempo':duracion});
	}

	RegistraSala(Sala) {
		// Metodo del escritorio donde se crea una ventana y se elimina de la salas

	  	this.Llamada.push({'nombre':Sala['nombre'],'id':Sala['id'],'numero':Sala['numero'],'Tipo':'Sala','Estado':'Inactiva'});
	  	this.EliminaItemSalas(Sala['id']);
  		
	}
	CerrarLlamada(llamada){
		// Metodo en el escritorio para cerrar la llamada del escritorio

		this.EliminaItemLlamadas(llamada['Id']);
		if (llamada['Tipo']=='Sala') {
			this.Salas.push({'nombre':llamada['Nombre'],'id':llamada['Id'],'Dimesions':'5','Ocupando':'1','Numero':llamada['Numero']});
		}
		

	}
	VerParticipantes(event){
		//console.log('Llega el evento y debe de cambiar los componentes')
		this.CambiaHideLateral();
		console.log(this.ParticipantesSala);
	}
	AgendaLlamada(ContactoAgenda){
		// metodo donde se llama a un contacto mediante la agenda

		this.Llamada.push({'nombre':ContactoAgenda['Nombre'],'id':ContactoAgenda['Id'],'numero':ContactoAgenda['Numero'],'Tipo':'Llamada','Estado':'Inactiva'});
		this.AgregarEventoPanel(ContactoAgenda['Numero'],'15/11/2019','false','entrante');
	}
	ContestarLlamada(Notificacion){
		
		this.Llamada.push({'nombre':Notificacion['Nombre'],'id':Notificacion['Id'],'numero':Notificacion['Numero'],'Tipo':'Llamada','Estado':'Inactiva'});
		this.AgregarEventoPanel(Notificacion['Numero'],'15/11/2019','false','entrante');
		this.EliminaItemNotificacion(Notificacion['Id']);

	}
	ColgarLlamada(Notificacion){
		this.AgregarEventoPanel(Notificacion['Numero'],'15/11/2019','false','perdida');
		this.EliminaItemNotificacion(Notificacion['Id']);
		
	}

	DialPadComponent() {
		this.modalRef = this.modalService.show(DialPadComponent);
	}
	EliminaItemLlamadas(id_llamada){
		let aux=[];
		for (var i = 0 ; i < this.Llamada.length; i++) {
			if (id_llamada != this.Llamada[i]['id']) {
				aux.push(this.Llamada[i]);
			}
		}
		this.Llamada=aux;
	}
	EliminaItemSalas(id_Salas){
		let aux=[];
		for (var i = 0 ; i < this.Salas.length; i++) {
			if (id_Salas != this.Salas[i]['id']) {
				aux.push(this.Salas[i]);
			}
		}
		this.Salas=aux;
	}
	EliminaItemNotificacion(id_Notificacion){
		let aux=[];
		for (var i = 0 ; i < this.Notificaciones.length; i++) {
			if (id_Notificacion != this.Notificaciones[i]['id']) {
				aux.push(this.Notificaciones[i]);
			}
		}
		this.Notificaciones=aux;
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
	MicrophoneOption(){
		// Aqui viene las opciones para el microfono del operador
	}
	AudioOption(){
		// Aqui viene las opciones para el audio del operador
	}
	NetworkSignalOption(){
		// Aqui viene las opciones para la red del operador
	}
	Busqueda(){
		//Aqui viene los metodos y/o contenido de la busqueda
	}
	ObtenerTiempo(){
		//Aqui viene los metodos y/o contenido de la busqueda
		var date= new Date();
		//console.log('El dato es :'+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds());
		return date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
	}
	CambiaHideLateral(){
		if (this.HideLateral==true) {
			this.HideLateral=false;
		}
		else{
			this.HideLateral=true;
		}
	}
}