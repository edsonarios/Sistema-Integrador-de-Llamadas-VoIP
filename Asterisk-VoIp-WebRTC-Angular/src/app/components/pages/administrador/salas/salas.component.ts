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

  recibirSalas() {
    this.serviceSala.listarSalas().subscribe(
      (response) => {
        response.forEach((element) => {
          var name = element.nombreSala;
          name = name.toLowerCase();
          console.log(element);
          if (!name.includes('radio')) {
            this.sala.push(element);
          }
        });
      },
      (er) => console.log(er),
      () => console.log('terminado')
    );
  }
}
