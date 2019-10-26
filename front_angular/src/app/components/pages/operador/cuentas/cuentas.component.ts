import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['../../../../sass/main.scss']
})
export class CuentasComponent implements OnInit {
  constructor(private router: Router) {
    console.log('componente cuentas se cargo correctamente');
  }

  ngOnInit() {}
}
