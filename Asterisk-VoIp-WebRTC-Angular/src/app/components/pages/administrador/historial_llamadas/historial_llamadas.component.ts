import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { HistorialService } from '@services/historial.service';

import * as moment from 'moment';

@Component({
  selector: 'Historial-Llamadas',
  templateUrl: './historial_llamadas.component.html',
})
export class HistorialLlamadasComponent implements OnInit {
  addform: FormGroup;

  public Historial;

  //obtenemos los datos del usuario actual
  public us = localStorage.getItem('Usuario');
  public obj = JSON.parse(this.us);
  // Aquí va el numero actual del operador
  public numero = localStorage.getItem('NumberSelected');

  public Historia = [];

  public HistAdmin = [];
  public HistOper = [];

  public HistSaliente = [];
  public HistEntrante = [];
  public HistPerdida = [];

  constructor(
    private formBuilder: FormBuilder,
    private historialService: HistorialService,
    private router: Router
  ) {
    this.Historial = [
      {
        Nombre: 'Daniel',
        Numero: '3001',
        Tipo: 'Entrante',
        Origen: 'Caja',
        Destino: 'Patrulla',
        Duracion: '02:30 min',
        Fecha: '05/02/2019',
        Audio: 'jfdsafdsajp1321.wmp',
      },
      {
        Nombre: 'Daniel',
        Numero: '3001',
        Tipo: 'Saliente',
        Origen: 'Caja',
        Destino: 'Patrulla',
        Duracion: '02:30 min',
        Fecha: '05/02/2019',
        Audio: 'jfdsafdsajp1321.wmp',
      },
      {
        Nombre: 'Daniel',
        Numero: '3001',
        Tipo: 'Entrante',
        Origen: 'Caja',
        Destino: 'Patrulla',
        Duracion: '02:30 min',
        Fecha: '05/02/2019',
        Audio: 'jfdsafdsajp1321.wmp',
      },
      {
        Nombre: 'Daniel',
        Numero: '3001',
        Tipo: 'Perdida',
        Origen: 'Caja',
        Destino: 'Patrulla',
        Duracion: '02:30 min',
        Fecha: '05/02/2019',
        Audio: 'jfdsafdsajp1321.wmp',
      },
      {
        Nombre: 'Daniel',
        Numero: '3001',
        Tipo: 'Entrante',
        Origen: 'Caja',
        Destino: 'Patrulla',
        Duracion: '02:30 min',
        Fecha: '05/02/2019',
        Audio: 'jfdsafdsajp1321.wmp',
      },
      {
        Nombre: 'Daniel',
        Numero: '3001',
        Tipo: 'Saliente',
        Origen: 'Caja',
        Destino: 'Patrulla',
        Duracion: '02:30 min',
        Fecha: '05/02/2019',
        Audio: 'jfdsafdsajp1321.wmp',
      },
      {
        Nombre: 'Daniel',
        Numero: '3001',
        Tipo: 'Saliente',
        Origen: 'Caja',
        Destino: 'Patrulla',
        Duracion: '02:30 min',
        Fecha: '05/02/2019',
        Audio: 'jfdsafdsajp1321.wmp',
      },
      {
        Nombre: 'Daniel',
        Numero: '3001',
        Tipo: 'Perdida',
        Origen: 'Caja',
        Destino: 'Patrulla',
        Duracion: '02:30 min',
        Fecha: '05/02/2019',
        Audio: 'jfdsafdsajp1321.wmp',
      },
      {
        Nombre: 'Daniel',
        Numero: '3001',
        Tipo: 'Entrante',
        Origen: 'Caja',
        Destino: 'Patrulla',
        Duracion: '02:30 min',
        Fecha: '05/02/2019',
        Audio: 'jfdsafdsajp1321.wmp',
      },
    ];

    this.buildForm();
  }

  private buildForm() {
    this.addform = this.formBuilder.group({
      selectedDate: ['', Validators.required],
      nameContact: ['', Validators.required],
    });

    this.addform.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      console.log(value);
    });
  }
  //  DD // MM // YYYY
  convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [mnth, day, date.getFullYear()].join('/');
  }
  filtrar(obj) {
    obj.selectedDate = this.convert(obj.selectedDate);
    console.log(this.convert(obj.selectedDate));

    var aux = [];
    this.HistAdmin.forEach((element) => {
      if (
        element.clid.includes(obj.nameContact) &&
        element.calldate.includes(obj.selectedDate)
      ) {
        aux.push(element);
      }
    });
    this.Historia = aux;
  }

  //funcion para llenar el array, dependiendo del tipo de usuario (admin, standard)

  preload() {
    console.log(this.obj);
    if (this.obj == null) {
      console.log('el usuario es nulo');
      return;
    }

    // Standard
    if (this.obj.tipo == 'standard') {
      this.llenarHistorialOperador();
    }
    //Administradores
    else {
      this.llenarCDRxAdmin();
    }
  }

  llenarCDRxAdmin() {
    this.historialService.HistorialLlamadasAdministrador().subscribe(
      (response) => {
        // response.forEach((element) => {
        //   var fecha = moment(element.calldate).subtract(10, 'days').calendar();
        //   element.calldate = fecha;
        //   console.log(element.calldate);
        // });
        this.HistAdmin = response;
        this.Historia = response;

        this.HistAdmin.forEach((element) => {
          element.calldate = moment(element.calldate)
            .subtract(10, 'days')
            .calendar();
          console.log(element.calldate);
          //salientes
          if (
            element.disposition == 'ANSWERED' &&
            element.clid.includes(element.src)
          ) {
            this.HistSaliente.push(element);
          }
          //Entrantes
          if (
            element.disposition == 'ANSWERED' &&
            element.clid.includes(element.dst)
          ) {
            this.HistEntrante.push(element);
          }
          //Perdidas
          if (element.disposition == 'NO ANSWERED') {
            this.HistPerdida.push(element);
          }
        });
      },
      (er) => console.log(er)
    );
  }

  llenarHistorialOperador() {
    console.log(this.numero);
    this.historialService.HistorialxSipoIax(this.numero).subscribe(
      (response) => {
        this.HistOper = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.Historia = this.HistOper;
  }

  salientesHist() {
    if (this.obj.tipo == 'standard') {
    } else {
      this.Historia = this.HistSaliente;
    }
  }

  entrantesHist() {
    // Aca se compara con el atributo si fue entrante
    if (this.obj.tipo == 'admin') {
      this.Historia = this.HistEntrante;
    } else {
    }
  }

  perdidasHist() {
    // Aca se compara con el atributo si fue perdida
    if (this.obj.tipo == 'admin') {
      this.Historia = this.HistPerdida;
    } else {
    }
  }

  defaultHistOpe() {
    if (this.obj.tipo == 'standard') {
      this.Historia = this.HistOper;
    } else {
      console.log('todas las llamadas ');
      this.Historia = this.HistAdmin;
    }
  }

  buscar() {
    console.log('buscar!!!!');
    this.filtrar(this.addform.value);
  }

  onChange(event) {
    //console.log(event);
  }

  ngOnInit() {
    this.preload();
  }
  cssch() {
    document.getElementById('nav').style.cssText = 'background: red;';
  }
}
