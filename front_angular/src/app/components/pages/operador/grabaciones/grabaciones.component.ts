import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'grabaciones',
  templateUrl: './grabaciones.component.html',
  styleUrls: ['../../../../sass/main.scss']
})
export class GrabacionesComponent implements OnInit {

  constructor(private router:Router) { 
  	console.log("componente grabaciones se cargo correctamente");
  }

  ngOnInit() {
  }
}
