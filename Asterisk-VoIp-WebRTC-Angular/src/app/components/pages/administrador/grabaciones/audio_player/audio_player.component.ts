import { Component ,Input , HostBinding, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { PlayerService, Track } from '@services/player.service';

import {interval, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
	selector: 'audio-player',
	templateUrl: './audio_player.component.html'
})
export class AudioPlayerComponent implements OnDestroy  {

	 @Input()
  @HostBinding('class.collapsed')
  collapsed: boolean;

  track: Track;
  player: HTMLAudioElement;
  shuffle: boolean;

	valor: number=0;

	constructor(private router: Router,
		private playerService: PlayerService) {
		  this.track = this.playerService.random();
    this.createPlayer();

    const contador=interval(1000);

    const max = timer(11000);

    const example = contador.pipe(takeUntil(max));

    const subscribe = example.subscribe((n) => {this.valor=this.getProgress()});

    //this.valor=this.getProgress();
		//let value =  Math.floor(Math.random() * 100 + 1);
	}
  actualiza(){
    this.valor=this.getProgress();
  }
	 private createPlayer() {
    this.player = new Audio();
    this.player.onended = () => this.next();
    this.setTrack();
	  }

	  private reload() {
	    this.setTrack();
	    this.player.play();
	  }

	  private setTrack() {
	    this.player.src = this.track.url;
	    this.player.load();
	  }

  ngOnDestroy() {
    this.player.pause();
    this.player.src = '';
    this.player.load();
  }
	Play(){
		this.valor=0;
//Prueba en un intervalo de 10 segundos
		const contador=interval(1000);

		const max = timer(11000);

		const example = contador.pipe(takeUntil(max));

		const subscribe = example.subscribe((n) => {this.valor=this.valor+10});
		
		

	}
	prev() {
    if (!this.player.loop) {
      if (this.shuffle) {
        this.track = this.playerService.random();
      } else {
        this.track = this.playerService.prev();
      }
    }

    this.reload();
  }

  next() {
    if (!this.player.loop) {
      if (this.shuffle) {
        this.track = this.playerService.random();
      } else {
        this.track = this.playerService.next();
      }
    }

    this.reload();
  }

  playPause() {
    if (this.player.paused) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }

  toggleShuffle() {
    this.shuffle = !this.shuffle;
  }

  toggleLoop() {
    this.player.loop = !this.player.loop;
  }

  setVolume(volume: number) {
    this.player.volume = volume / 100;
  }

  getVolume(): number {
    return this.player.volume * 100;
  }

  setProgress(duration: number) {
    this.player.currentTime = this.player.duration * duration / 100;
  }

  getProgress(): number {
    return this.player.currentTime / this.player.duration * 100 || 0;
  }
}
