import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'sip',
	templateUrl: './sip.component.html'
})
export class SipComponent implements OnInit {
	@Input() Alias:string;
	@Input() Numero:string;
	@Input() Context:string;

	constructor(private router: Router) {
	}

	ngOnInit() {
		
	}
	
}
