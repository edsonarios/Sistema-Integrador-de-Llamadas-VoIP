import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'operador-template',
  templateUrl: './operador-template.component.html',
  styleUrls: ['../../../sass/main.scss']
})
export class OperadorTemplateComponent implements OnInit {

  ngOnInit() { 
  	console.log("Carga el dashboard");
  }
}
