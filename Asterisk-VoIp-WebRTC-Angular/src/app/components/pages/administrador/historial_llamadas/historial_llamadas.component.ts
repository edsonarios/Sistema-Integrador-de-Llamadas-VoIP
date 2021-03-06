import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { HistorialService } from '@services/historial.service';

import * as moment from 'moment';

@Component({
  selector: 'Historial-Llamadas',
  templateUrl: './historial_llamadas.component.html',
})
export class HistorialLlamadasComponent implements OnInit {
  addform: FormGroup;

  search = new FormControl('');

  //obtenemos los datos del usuario actual
  public us = localStorage.getItem('Usuario');
  public obj = JSON.parse(this.us);
  // Aquí va el numero actual del operador
  public numberSelected = localStorage.getItem('NumberSelected');

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

  convertseconds(segundos){
    let minutos = Math.floor(segundos/60);
    let seconds = Math.floor(segundos%60);
    let m, s;
    m = minutos<10? '0'+minutos : minutos;
    s = seconds<10? '0'+seconds : seconds;
    return m+':'+s;
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
        this.HistAdmin = response;
        this.Historia = response;

        this.HistAdmin.forEach((element) => {
          element.calldate = this.convert(element.calldate);
          element.segundos = this.convertseconds(element.segundos);
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
    console.log(this.numberSelected);
    // this.historialService.HistorialxSipoIax(this.numberSelected).subscribe(
    //   (response) => {
    //     response.forEach((element) => {
    //       console.log(element)
    //       element.fechayhora = this.convert(element.fechayhora);
    //       element.segundos = this.convertseconds(element.segundos);
            
    //         if(element.tipo == 'entrante'){
    //           this.HistEntrante.push(element);
    //         }
    //         if(element.tipo == 'saliente'){
    //           this.HistSaliente.push(element);
    //         }
    //         if(element.tipo == 'perdida'){
    //           this.HistPerdida.push(element);
    //         }
    //       });
    //     this.HistOper = response;
    //     console.log(response);
    //     this.Historia = this.HistOper;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
    
    var fecha1, fecha2;
    fecha1 = new Date();
    fecha1 = new Date(fecha1.setDate(fecha1.getDate() + 1));
    fecha1 = this.cambioFecha(fecha1);
    console.log(fecha1);
    
    fecha2 = new Date(new Date().setDate(new Date().getDate() - 3));
    fecha2 = this.cambioFecha(fecha2);
    console.log(fecha2);
    this.historialService.HistorialxSipoIaxEntreFecha(this.numberSelected, fecha2, fecha1).subscribe((response)=>{
      console.log(response);
      response.forEach((element) => {
          console.log(element)
          element.fechayhora = this.convert(element.fechayhora);
          element.segundos = this.convertseconds(element.segundos);
            
            if(element.tipo == 'entrante'){
              this.HistEntrante.push(element);
            }
            if(element.tipo == 'saliente'){
              this.HistSaliente.push(element);
            }
            if(element.tipo == 'perdida'){
              this.HistPerdida.push(element);
            }
          });
        this.HistOper = response;
        console.log(response);
        this.Historia = this.HistOper;
    });
  }

  cambioFecha(fecha){
    var fech = fecha.toISOString().slice(0,10);
    var info = fech.split('-'); 
    return info[0] + '/' + info[1] + '/' + info[2];
  }

  salientes() {
    if (this.obj.tipo == 'standard') {
      this.Historia = this.HistSaliente;
    } else {
    }
  }

  entrantes() {
    // Aca se compara con el atributo si fue entrante
    if (this.obj.tipo == 'standard') {
      this.Historia = this.HistEntrante;
    } else {
    }
  }

  perdidas() {
    // Aca se compara con el atributo si fue perdida
    if (this.obj.tipo == 'standard') {
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

  ngOnInit() {
    this.preload();
    this.search.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.Historia = this.HistOper.filter((it) => it.numero.includes(value));
  });
  }
  cssch() {
    document.getElementById('nav').style.cssText = 'background: red;';
  }
}
