import { Component, OnInit ,Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'iax',
	templateUrl: './iax.component.html'
})
export class IaxComponent implements OnInit {
	@Input() Alias:string;
	@Input() Numero:string;
	@Input() Context:string;

	constructor(private router: Router) {
	}

	ngOnInit() {
		
	}
	
}
