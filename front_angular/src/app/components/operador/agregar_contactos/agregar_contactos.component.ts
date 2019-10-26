import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'Agregar-Contactos',
  templateUrl: './agregar_contactos.component.html',
  styleUrls: ['../../../sass/main.scss'],
  providers: [UserService],

})
export class AgregarContactosComponent implements OnInit {

  wrong = false;
  public identity: Object;
  addForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  user: User;
  constructor(
    private router:Router,
    public userService: UserService,  
    private formBuilder: FormBuilder,
    ) { 

  }

  ngOnInit() {
    console.log('Componente formulario cargado');
    
    //this.addContact();
    this.addForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      alias: ['', Validators.required],
      tipo: ['', Validators.required],
      telnumero: ['', Validators.required],
      descripcion: ['', Validators.required],
  });
  
  }

  get f() { return this.addForm.controls; } 

    addContact(){
      if (this.addForm.invalid) {
        return;
      }
    }



}
