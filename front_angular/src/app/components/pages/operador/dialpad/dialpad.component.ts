import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'dialpad',
  templateUrl: './dialpad.component.html',
  styleUrls: ['../../../../sass/main.scss']
})
export class DialPadComponent implements OnInit {
  constructor(private router: Router,
    private modalService: BsModalService, ) {
    console.log('Dialpad se cargo Correctamente');
  }

  ngOnInit() { }
}
