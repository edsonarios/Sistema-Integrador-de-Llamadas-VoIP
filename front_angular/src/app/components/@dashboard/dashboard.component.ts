import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'template-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../sass/main.scss']
})
export class DashboardComp implements OnInit {
  faCoffee = faCoffee;

  constructor() { 
  	console.log("Se carga el dashboard");
  }

  ngOnInit() {
  }

}
