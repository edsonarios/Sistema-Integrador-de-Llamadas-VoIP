import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'Historial-Llamadas',
  templateUrl: './historial_llamadas.component.html',
  styleUrls: ['../../../../sass/main.scss']
})
export class HistorialLlamadasComponent implements OnInit {
  constructor(private router: Router) {
    console.log('El historial se carga Correctamente');
  }

  ngOnInit() {}
}
