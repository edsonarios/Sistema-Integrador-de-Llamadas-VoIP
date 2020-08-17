import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistorialService } from '@services/historial.service';
import { GrabacionesService } from '@services/grabaciones.service';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'grabaciones',
  templateUrl: './grabaciones.component.html',
})
export class GrabacionesComponent implements OnInit {
  public Historial;
  
  filtroValue = '';
  search = new FormControl('');
  
  public Historia = [];

  public HistAdmin = [];
  public HistOper = [];

  public HistSaliente = [];
  public HistEntrante = [];
  public HistPerdida = [];

  //obtenemos los datos del usuario actual
  public us = localStorage.getItem('Usuario');
  public obj = JSON.parse(this.us);

  // Aquí va el numero actual del operador
  public numero = localStorage.getItem('NumberSelected');

  constructor(
    private historialService: HistorialService,
    private grabaservice: GrabacionesService,
    private router: Router
  ) {
    
  }

  ngOnInit() {
    this.preload();

    this.search.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.Historia = this.HistOper.filter((it) => it.numero.includes(value));
  });
  }
  DescargarAudio(uni, cha) {
    this.grabaservice.downloadFile(uni, cha).subscribe(data => {
      const blob = new Blob([data], {
        type: 'application/zip'
      });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
 
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
        
        this.HistAdmin.forEach((element) => {
          element.calldate = this.convert(element.calldate);
          element.segundos = this.convertseconds(element.segundos);
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
    this.Historia = this.HistAdmin;
  }

  llenarHistorialOperador() {
    console.log(this.numero);
    this.historialService.HistorialxSipoIax(this.numero).subscribe(
      (response) => {
        response.forEach(it => {
          var fec = this.convert(it.fechayhora);
          it.fechayhora = fec;
          it.segundos = this.convertseconds(it.segundos);
          if(it.tipo == 'entrante'){
            this.HistEntrante.push(it);
          }
          if(it.tipo == 'saliente'){
            this.HistSaliente.push(it);
          }
          if(it.tipo == 'perdida'){
            this.HistPerdida.push(it);
          }
        });
        console.log(response);
        this.HistOper = response;
        this.Historia = this.HistOper;
      },
      (error) => {
        console.log(error);
      }
    );
    
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

  convertseconds(segundos){
    let minutos = Math.floor(segundos/60);
    let seconds = Math.floor(segundos%60);
    let m, s;
    m = minutos<10? '0'+minutos : minutos;
    s = seconds<10? '0'+seconds : seconds;
    return m+':'+s;
  }

  convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [mnth, day, date.getFullYear()].join('/');
  }
}
