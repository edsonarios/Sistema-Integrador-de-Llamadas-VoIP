import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
	selector: 'dialpad',
	templateUrl: './dialpad.component.html'
})
export class DialPadComponent implements OnInit {
	dialNumber: string = '';
	constructor(private router: Router, private modalService: BsModalService) {

	}

	ngOnInit() {}
	DialNum(Num){
		this.dialNumber=this.dialNumber+Num;
	}
	Llamada() {
		window.alert('Llamando al : '+this.dialNumber);
	}
}
