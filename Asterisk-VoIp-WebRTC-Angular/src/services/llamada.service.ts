import { Injectable } from '@angular/core';
import { DialPadComponent } from '../app/components/pages/operador/dialpad/dialpad.component';


@Injectable()
export class LlamadaService {
  
  numerodestino = '';
  
  constructor() { }
 
  llamada(numero){
    console.log(numero);
    this.numerodestino = numero;
  }

  darnumero(){
      return this.numerodestino;
  }
}