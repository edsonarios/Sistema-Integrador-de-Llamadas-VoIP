import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistorialService } from '@services/historial.service';

//import * as moment from 'moment';

@Component({
  selector: 'Historial-Llamadas',
  templateUrl: './historial_llamadas.component.html',
})
export class HistorialLlamadasComponent implements OnInit {
  public Historial;

  //obtenemos los datos del usuario actual  
  public us = localStorage.getItem('Usuario');
  public obj = JSON.parse(this.us);
  // Aquí va el numero actual del operador
  public numero = 123;

  public Historia = [];

  public HistAdmin = [];
  
  public HistOper = [];
  public HistSaliente = [];
  public HistEntrante = [];
  public HistPerdida = [];


  


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





  //funcion para llenar el array, dependiendo del tipo de usuario (admin, standard)

  preload() {
    
    // Administradores
    if (this.obj.tipo == 'admin') {
      this.llenarCDRxAdmin();
    }
    // Standard
    else {
      this.llenarHistorialOperador();
    }
  }

  llenarCDRxAdmin() {
    this.historialService.HistorialLlamadasAdministrador().subscribe(
      (response) => {
        this.HistAdmin = response;
      },
      (er) => console.log(er)
    );
    this.Historia = this.HistAdmin;
  }

  llenarHistorialOperador() {
    this.historialService.HistorialxSipoIax(this.numero).subscribe(
      (response) => {
        this.HistOper = response;
      },
      (error) => {
        console.log(error);
      }
    );
    this.Historia = this.HistOper;
  }

  salientesHist() {  
    if(this.obj.tipo == 'admin'){
      // Aca se compara con el atributo si fue saliente
      this.HistAdmin.forEach(element => {
        if(element){
          this.HistSaliente.push(element);
        }   
      });
    }
    else{
      this.HistOper.forEach(element => {
        // Aca se compara el atributo si fue saliente
        if(element){
          this.HistSaliente.push(element);
        }
      });
    }
    this.Historia = this.HistSaliente;
  }

  entrantesHist(){
    // Aca se compara con el atributo si fue entrante
    if(this.obj.tipo == 'admin'){
      this.HistAdmin.forEach(element => {
        if(element){
          this.HistEntrante.push(element);
        }   
      });
    }else{
      this.HistOper.forEach(element => {
        // Aca se compara el atributo si fue entrante
        if(element){
          this.HistEntrante.push(element);
        }
      });
    }
    this.Historia = this.HistEntrante;
  }

  perdidasHist(){
    // Aca se compara con el atributo si fue perdida
    if(this.obj.tipo == 'admin'){
      this.HistAdmin.forEach(element => {
        if(element){
          this.HistPerdida.push(element);
        }   
      });
    }else{
      this.HistOper.forEach(element => {
        // Aca se compara el atributo si fue perdida
        if(element){
          this.HistPerdida.push(element);
        }
      });
    }
    this.Historia = this.HistPerdida;
  }

  defaultHistOpe(){
    if(this.obj.tipo == 'admin'){
      this.Historia = this.HistAdmin;
    }else{
      this.Historia = this.HistOper;
    }
  }

  onChange(event) {
    //console.log(event);
  }

  ngOnInit() {
    //this.preload();
  }
  cssch() {
    document.getElementById('nav').style.cssText = 'background: red;';
  }
}
