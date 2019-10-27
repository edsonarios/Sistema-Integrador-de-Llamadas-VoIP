import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from '../../../../models/user';
import { Sala } from '../../../../models/sala';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DialPadComponent } from '../../pages/operador/dialpad/dialpad.component';
import {AgregarContactosComponent } from '../../pages/operador/agregar_contactos/agregar_contactos.component';

@Component({
  selector: 'operador-template',
  templateUrl: './operador-template.component.html',
  styleUrls: ['../../../sass/main.scss']
})
export class OperadorTemplateComponent implements OnInit {
  user: User;
  public sala;

   wrong = false;
  public identity: Object;
  addForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService,
     private formBuilder: FormBuilder,) {

  }
  ngOnInit() {
    console.log('Carga el dashboard');
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
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  DialPadComponent(){
    this.modalRef = this.modalService.show(DialPadComponent);
  }
  AgregarContactosComponent(){
    this.modalRef = this.modalService.show(AgregarContactosComponent);
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
  datosSala(id, nombre, descripcion) {
    window.alert(
      'Id : ' +
        id +
        '\n Nombre : ' +
        nombre +
        '\n Descripcion : ' +
        descripcion +
        '\n \n \t Listo para recibir metodos!'
    );
  }
  DialPad(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    //window.alert('pendiente');
  }
  settings() {
    window.alert('pendiente plox');
  }
  addSala() {
    window.alert('pendiente , nueva ventana + ruta');
  }
}
