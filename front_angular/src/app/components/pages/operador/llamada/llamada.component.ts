import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'llamada',
  templateUrl: './llamada.component.html',
  styleUrls: ['../../../../sass/main.scss']
})
export class LlamadaComponent implements OnInit {
  constructor(private router: Router,
  	private modalService: BsModalService,) {
    
  }

  ngOnInit() {}
}
