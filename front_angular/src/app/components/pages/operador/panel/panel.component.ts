import { Component, OnInit ,Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'panel',
	templateUrl: './panel.component.html'
})
export class PanelComponent implements OnInit {
	 @Input() Tiempo: string;

	constructor(private router: Router) {
	
	}

	ngOnInit() {}

}
