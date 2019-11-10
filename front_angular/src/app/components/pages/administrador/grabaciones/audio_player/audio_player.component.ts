import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {interval, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
	selector: 'audio-player',
	templateUrl: './audio_player.component.html'
})
export class AudioPlayerComponent implements OnInit {
	valor: number=0;
	constructor(private router: Router) {
		//let value =  Math.floor(Math.random() * 100 + 1);
	}

	ngOnInit() {}

	Play(){
		this.valor=0;
//Prueba en un intervalo de 10 segundos
		const contador=interval(1000);

		const max = timer(11000);

		const example = contador.pipe(takeUntil(max));

		const subscribe = example.subscribe((n) => {this.valor=this.valor+10});
		
		

	}
}
