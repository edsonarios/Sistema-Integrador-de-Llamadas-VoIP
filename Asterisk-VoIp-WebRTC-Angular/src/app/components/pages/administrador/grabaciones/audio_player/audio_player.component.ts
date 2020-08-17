import { Component, ElementRef ,Input , HostBinding, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { PlayerService, Track } from '@services/player.service';
import {GrabacionesService} from '@services/grabaciones.service';
import {SnotifyService } from 'ng-snotify';

@Component({
	selector: 'audio-player',
	templateUrl: './audio_player.component.html'
})
export class AudioPlayerComponent implements OnInit  {

  

  @Input('data') data: any;
  
  @HostBinding('class.collapsed')
  
  @HostListener('document:click', ['$event']) 
  
  
  collapsed: boolean;
  player1: HTMLAudioElement;
  player2: HTMLAudioElement;
  uri1;
  uri2;

  sw: boolean;
  first= false;

 

  //audio
  audio = new Audio();
  value = '';
   max ="";

   public text: String;
	valor: number=0;

   
  constructor(private router: Router,
		private playerService: PlayerService, private grabacionesService: GrabacionesService, private snotifyService: SnotifyService, private eRef: ElementRef) {
      this.text = 'no clicks yet';
	
  }
  
  clickout(event) { 
    if(this.eRef.nativeElement.contains(event.target)) { 
     this.text = "clicked inside"; 
    } else { 
     this.text = "clicked outside"; 
    } 
  }


  ngOnInit() {
    this.sw = false;
      // this.player1 = new Audio();
      this.audio = new Audio();
      this.player2 = new Audio();
  }

  play(){ 
    let unique = this.data.uniqueid; 
    let chann = this.data.channel;
    this.grabacionesService.repro(unique, chann).subscribe((data) => {
      

      this.audio.src = 'http://167.86.119.191'+data[0];
      this.audio.play();
      
      this.audio.addEventListener("timeupdate", (currentTime)=>{
        this.value = this.audio.currentTime+"";
        
        this.max = this.audio.duration+"";
        if(this.audio.ended){
          console.log('termino el audio...');
          this.value = 0+"";
          this.audio.currentTime = 0;
        }
        });
      /////////////////////
        // this.uri1 = 'http://167.86.119.191'+data[0];
        this.uri2 = 'http://167.86.119.191'+data[1];
        
        // this.player1.src = this.uri1;
        this.player2.src = this.uri2;
        // this.player1.play();
        this.player2.play();
        // setInterval(this.mostrarbarra,this.nume);
        // setInterval(this.mostrarbarra,1000,this.player1);
        

    }
    ,error=>{
      this.sw = true;
      this.snotifyService.error('AUDIO NO ENCOTRADO...', { showProgressBar: false }); 
    });
    
  }

  convertseconds(segundos){
    let minutos = Math.floor(segundos/60);
    let seconds = Math.floor(segundos%60);
    let m, s;
    m = minutos<10? '0'+minutos : minutos;
    s = seconds<10? '0'+seconds : seconds;
    return m+':'+s;
  }
  
  playPause() {
    if(!this.first){
      this.play();
      //
      this.first = true;
    }else{  
    if (this.audio.paused) {
      this.audio.play();
      this.player2.play();
      ///
    } else {
      this.audio.pause();
      this.player2.pause();
    }
    }
  }

}
