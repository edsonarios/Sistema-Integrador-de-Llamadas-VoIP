import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'roles',
  templateUrl: './roles.component.html',
  styleUrls: ['../../../../sass/main.scss']
})
export class RolesComponent implements OnInit {
  constructor(private router: Router) {
    console.log('componente Roles se cargo correctamente');
  }

  ngOnInit() {}
}
