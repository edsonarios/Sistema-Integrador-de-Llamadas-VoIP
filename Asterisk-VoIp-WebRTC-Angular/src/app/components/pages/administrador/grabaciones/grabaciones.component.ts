import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistorialService } from '@services/historial.service';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

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
  }

  ngOnInit() {
    this.preload();

    this.search.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.Historia = this.HistOper.filter((it) => it.numero.includes(value));
  });
  }
  DescargarAudio() {
    //Metodo de descarga
    console.log('Descargando...');
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
    this.Historia = this.HistAdmin;
  }

  llenarHistorialOperador() {
    console.log(this.numero);
    this.historialService.HistorialxSipoIax(this.numero).subscribe(
      (response) => {
        response.forEach(it => {
          var fec = moment(it.fechayhora).subtract(10, 'days').calendar();
          it.fechayhora = fec;
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

  salientesHist() {
    if (this.obj.tipo == 'admin') {
      this.Historia = this.HistSaliente;
    } else {
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

  todos(){
    if(this.obj.tipo == 'admin'){
      this.Historia = this.HistAdmin;
    }
    else{
      this.Historia = this.HistOper;
    }
  }
}
