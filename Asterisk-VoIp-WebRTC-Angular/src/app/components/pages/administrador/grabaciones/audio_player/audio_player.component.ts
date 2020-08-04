import { Component ,Input , HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PlayerService, Track } from '@services/player.service';
import {GrabacionesService} from '@services/grabaciones.service';
import {interval, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
	selector: 'audio-player',
	templateUrl: './audio_player.component.html'
})
export class AudioPlayerComponent implements OnInit  {

  @Input('data') data: any;
  
  
  
  @HostBinding('class.collapsed')
  collapsed: boolean;

  player1: HTMLAudioElement;
  player2: HTMLAudioElement;
  uri1;
  uri2;

  first= false;

  // track: Track;
  // player: HTMLAudioElement;
  // shuffle: boolean;



	valor: number=0;

	constructor(private router: Router,
		private playerService: PlayerService, private grabacionesService: GrabacionesService) {
      
		// this.track = this.playerService.random();
    // this.createPlayer();

    // const contador=interval(1000);

    // const max = timer(11000);

    // const example = contador.pipe(takeUntil(max));

    // const subscribe = example.subscribe((n) => {this.valor=this.getProgress()});

    // this.valor=this.getProgress();
		//let value =  Math.floor(Math.random() * 100 + 1);
	}
  // actualiza(){
  //   this.valor=this.getProgress();
  // }
	//  private createPlayer() {
  //   this.player = new Audio();

  //   this.player.onended = () => this.next();
  //   this.setTrack();
	//   }

	  // private reload() {
	  //   this.setTrack();
	  //   this.player.play();
	  // }

	  // private setTrack() {
    //   console.log(this.uri);
	  //   this.player.src = this.uri;
	  //   this.player.load();
	  // }

  ngOnInit() {
  //   console.log(this.data.uniqueid);
  //   this.grabacionesService.repro(this.data.uniqueid, this.data.channel).subscribe((data) => {
  //     console.log(data);

      
  //  });
  
      this.player1 = new Audio();
      this.player2 = new Audio();
    // this.player.pause();
    // this.player.src = '';
    // this.player.load();
  }

  play(){ 
    let unique = this.data.uniqueid; 
    let chann = this.data.channel;
    this.grabacionesService.repro(unique, chann).subscribe((data) => {
        this.uri1 = 'http://167.86.119.191'+data[0];
        this.uri2 = 'http://167.86.119.191'+data[1];
        
        this.player1.src = this.uri1;
        this.player2.src = this.uri2;
        this.player1.play();
        this.player2.play();
    });

  }

  playPause() {
    if(!this.first){
      this.play();
      this.first = true;
    }else{  
    if (this.player1.paused) {
      this.player1.play();
      this.player2.play();
    } else {
      this.player1.pause();
      this.player2.pause();
    }
    }
  }

// 	Play(){
// 		this.valor=0;
// //Prueba en un intervalo de 10 segundos
// 		const contador=interval(1000);

// 		const max = timer(11000);

// 		const example = contador.pipe(takeUntil(max));

// 		const subscribe = example.subscribe((n) => {this.valor=this.valor+10});
		
		

// 	}
	// prev() {
  //   if (!this.player.loop) {
  //     if (this.shuffle) {
  //       this.track = this.playerService.random();
  //     } else {
  //       this.track = this.playerService.prev();
  //     }
  //   }

  //   this.reload();
  // }

  // next() {
  //   if (!this.player.loop) {
  //     if (this.shuffle) {
  //       this.track = this.playerService.random();
  //     } else {
  //       this.track = this.playerService.next();
  //     }
  //   }

  //   this.reload();
  // }

  // playPause() {
  //   if (this.player.paused) {
  //     this.player.play();
  //   } else {
  //     this.player.pause();
  //   }
  // }

  // toggleShuffle() {
  //   this.shuffle = !this.shuffle;
  // }

  // toggleLoop() {
  //   this.player.loop = !this.player.loop;
  // }

  // setVolume(volume: number) {
  //   this.player.volume = volume / 100;
  // }

  // getVolume(): number {
  //   return this.player.volume * 100;
  // }

  // setProgress(duration: number) {
  //   this.player1.currentTime = this.player1.duration * duration / 100;
  // }

  // getProgress(): number {
  //   return this.player1.currentTime / this.player1.duration * 100 || 0;
  // }
}
