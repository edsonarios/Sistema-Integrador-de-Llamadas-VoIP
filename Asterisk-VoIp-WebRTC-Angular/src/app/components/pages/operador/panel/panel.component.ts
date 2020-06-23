import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'panel',
	templateUrl: './panel.component.html'
})
export class PanelComponent implements OnInit {
	@Input() Tiempo: string;
	@Input() Objeto: any;

	public eventoPanel;

	public Panel = [];
	constructor(private router: Router) {}

	ngOnInit() {
		this.Panel = this.Objeto;
	}
}
