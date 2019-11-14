import { Component, OnInit ,TemplateRef} from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AgregarContactosComponent } from './agregar_contacto/agregar_contacto.component';
import { EditarContactoComponent } from './editar_contacto/editar_contacto.component';
@Component({
	selector: 'contactos',
	templateUrl: './contactos.component.html'
})
export class ContactosComponent implements OnInit {
	 public Contactos;
   
   modalRef: BsModalRef;
	constructor(private router: Router,
   private modalService: BsModalService
  ) {
		 this.Contactos=[
  		{'Nombre':'Daniel','Estado':'Conectado','Numero':'3001'},
  		{'Nombre':'Juan','Estado':'Desconectado','Numero':'3001'},
  		{'Nombre':'Marco','Estado':'Conectado','Numero':'3001'},
  		{'Nombre':'Mario','Estado':'Desconectado','Numero':'3002'},
  		{'Nombre':'Alonso','Estado':'Conectado','Numero':'3001'},
  		{'Nombre':'Edgar','Estado':'Desconectado','Numero':'3001'},
  		{'Nombre':'Daniel','Estado':'Conectado','Numero':'3001'},
  		{'Nombre':'Ramiro','Estado':'Desconectado','Numero':'3002'},
  		{'Nombre':'Daniel','Estado':'Conectado','Numero':'3001'},
  		{'Nombre':'Manuel','Estado':'Desconectado','Numero':'3001'},
  		{'Nombre':'Daniel','Estado':'Conectado','Numero':'3001'},
  		{'Nombre':'Daniel','Estado':'Desconectado','Numero':'3002'},
  		{'Nombre':'Antonio','Estado':'Conectado','Numero':'3001'},
  		{'Nombre':'Daniel','Estado':'Desconectado','Numero':'3001'},
  		{'Nombre':'Carlos','Estado':'Conectado','Numero':'3001'},
  		{'Nombre':'Daniel','Estado':'Desconectado','Numero':'3002'},
      {'Nombre':'Daniel','Estado':'Conectado','Numero':'3001'},
      {'Nombre':'Manuel','Estado':'Desconectado','Numero':'3001'},
      {'Nombre':'Daniel','Estado':'Conectado','Numero':'3001'},
      {'Nombre':'Daniel','Estado':'Desconectado','Numero':'3002'},
      {'Nombre':'Antonio','Estado':'Conectado','Numero':'3001'},
      {'Nombre':'Daniel','Estado':'Desconectado','Numero':'3001'},
      {'Nombre':'Carlos','Estado':'Conectado','Numero':'3001'},
      {'Nombre':'Daniel','Estado':'Desconectado','Numero':'3002'},];
	}

	ngOnInit() {}
  AgregarContacto  () {
    this.modalRef = this.modalService.show(AgregarContactosComponent);
  }
  EditarContacto (){
    this.modalRef= this.modalService.show(EditarContactoComponent);
  }
	 openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
