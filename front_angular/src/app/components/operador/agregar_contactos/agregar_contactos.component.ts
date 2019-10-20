import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'Agregar-Contactos',
  templateUrl: './agregar_contactos.component.html',
  styleUrls: ['../../../sass/main.scss']
})
export class AgregarContactosComponent implements OnInit {

  constructor(private router:Router) { 

  }

  ngOnInit() {
  }
}
