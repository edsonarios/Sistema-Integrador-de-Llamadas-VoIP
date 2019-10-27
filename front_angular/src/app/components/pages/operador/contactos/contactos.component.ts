import { Component, OnInit, TemplateRef} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { EditarContactosComponent } from '../editar_contactos/editar_contactos.component';
@Component({
  selector: 'Contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['../../../../sass/main.scss']
})
export class ContactosComponent implements OnInit {
   wrong = false;
  public identity: Object;
  addForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  public Contactos;
modalRef: BsModalRef;
  constructor(private router: Router,
       private formBuilder: FormBuilder,
       private modalService: BsModalService) {
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
    console.log('Contactos se Carga');
  }

  ngOnInit() {
    console.log('Componente formulario cargado');
    this.submit();
    //this.addContact();
    this.addForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      alias: ['', Validators.required],
      tipo: ['', Validators.required],
      telnumero: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

   EditarContactoComponent() {
    this.modalRef = this.modalService.show(EditarContactosComponent);
  }
   submit(){
    
  }

  get f() {
    return this.addForm.controls;
  }

  addContact() {
    if (this.addForm.invalid) {
      return;
    }
  }
}
