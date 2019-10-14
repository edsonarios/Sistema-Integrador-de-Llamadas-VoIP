import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../sass/main.scss']
})
export class DashboardComponent implements OnInit {
  faCoffee = faCoffee;

  constructor() { }

  ngOnInit() {
  }

}
