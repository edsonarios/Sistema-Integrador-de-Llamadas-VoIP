import { Component, OnInit ,TemplateRef} from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from '@services/user.service';
import { AgregarContactosComponent } from './agregar_contacto/agregar_contacto.component';
import { EditarContactoComponent } from './editar_contacto/editar_contacto.component';
import { User } from '@models/user';
@Component({
	selector: 'contactos',
	templateUrl: './contactos.component.html',
	providers: [UserService],
})
export class ContactosComponent implements OnInit {
	 public Contactos;
	contactos: [User];
	
   modalRef: BsModalRef;
	constructor(private router: Router,
   private modalService: BsModalService,private userservice: UserService
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

	ngOnInit() {this.listarContacto()}
  AgregarContacto  () {
    this.modalRef = this.modalService.show(AgregarContactosComponent);
  }
  EditarContacto (){
    this.modalRef= this.modalService.show(EditarContactoComponent);
  }
	 openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  listarContacto(){
		 this.userservice.findAllUsuario()
		.subscribe(
		rt => {
			console.log('Estos son los contactos existentes... \n');
			this.contactos = rt;
			console.log(this.contactos);
		},
		er => console.log(er),
		() => console.log('terminado')
		);
		
		}	
  
}
