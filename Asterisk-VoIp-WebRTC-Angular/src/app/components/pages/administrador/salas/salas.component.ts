import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalaService } from '@services/sala.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'salas',
  templateUrl: './salas.component.html',
  providers: [SalaService],
})
export class SalasComponent implements OnInit {
  public sala = [];

  constructor(private router: Router, private serviceSala: SalaService) {}

  ngOnInit() {
    this.recibirSalas();
    localStorage.removeItem('Sala');
  }
  prueba() {
    //window.alert('Prueba');
    Swal.fire('Hola Bonita <3');
  }
  recibirSalas() {
    this.serviceSala.listarSalas().subscribe(
      (response) => {
        response.forEach((element) => {
          var name = element.nombreSala;
          name = name.toLowerCase();
          if (name.indexOf('radio') != 0) {
            this.sala.push(element);
          }
        });
      },
      (er) => console.log(er),
      () => console.log('terminado')
    );
  }
}
