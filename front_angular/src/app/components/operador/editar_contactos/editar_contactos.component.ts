import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'Editar-Contactos',
  templateUrl: './editar_contactos.component.html',
  styleUrls: ['../../../sass/main.scss']
})
export class EditarContactosComponent implements OnInit {

  constructor(private router:Router) { 

  }

  ngOnInit() {
  }
}
