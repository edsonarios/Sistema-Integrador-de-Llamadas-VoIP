import { Injectable } from '@angular/core';

export class Track {
  name: string;
  artist: string;
  url: string;
  cover: string;

  
}


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  current: number;
  playlist: Track[] = [
    {
      name: 'Harder',
      artist: 'Daft Punk',
      url: 'https://p.scdn.co/mp3-preview/92a04c7c0e96bf93a1b1b1cae7dfff1921969a7b',
      cover: 'assets/images/cover2.jpg',
    }
  ];

  random(): Track {
    this.current = Math.floor(Math.random() * this.playlist.length);
    return this.playlist[this.current];
  }

  next(): Track {
    return this.getNextTrack();
  }

  prev() {
    return this.getPrevTrack();
  }

  private getNextTrack(): Track {
    if (this.current === this.playlist.length - 1) {
      this.current = 0;
    } else {
      this.current++;
    }

    return this.playlist[this.current];
  }

  private getPrevTrack(): Track {
    if (this.current === 0) {
      this.current = this.playlist.length - 1;
    } else {
      this.current--;
    }

    return this.playlist[this.current];
  }
}
