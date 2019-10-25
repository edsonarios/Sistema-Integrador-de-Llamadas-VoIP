import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'Contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['../../../../sass/main.scss']
})
export class ContactosComponent implements OnInit {

  constructor(private router:Router) { 
  	console.log("Contactos se Carga");
  }

  ngOnInit() {
  }
}
