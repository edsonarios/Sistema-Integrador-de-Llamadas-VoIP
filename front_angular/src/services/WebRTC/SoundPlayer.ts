// const AUDIOS = require('./sonidos.json');
import * as AUDIOS from './sonidos.json';

export class SoundPlayer {
	SOUNDS: any = new Map([
		['ringback', { audio: new Audio(AUDIOS['ringback']), volume: 1.0 }],
		['ringing', { audio: new Audio(AUDIOS['ringing']), volume: 1.0 }],
		['answered', { audio: new Audio(AUDIOS['answered']), volume: 1.0 }],
		['rejected', { audio: new Audio(AUDIOS['rejected']), volume: 0.5 }]
	]);

	init: Boolean = false;

	constructor() {
		this.initialize();
	}

	initialize() {
		if (this.init) return;
		for (const sound of this.SOUNDS.values()) {
			sound.audio.volume = 0;
			try {
				sound.audio.play();
			} catch (error) {}
		}
		this.init = true;
	}

	play(name, relativeVolume = 1) {
		this.initialize();

		if (typeof relativeVolume !== 'number') relativeVolume = 1.0;

		const sound = this.SOUNDS.get(name);

		if (!sound) throw new Error(`Nombre no encontrado "${name}"`);

		try {
			sound.audio.pause();
			sound.audio.currentTime = 0.0;
			sound.audio.volume = (sound.volume || 1.0) * relativeVolume;
			sound.audio.play();
		} catch (err) {
			console.log('[ ERROR ]', err);
		}
	}

	stop(name) {
		const sound = this.SOUNDS.get(name);

		if (!sound) throw new Error(`Nombre no encontrado "${name}"`);

		sound.audio.pause();
		sound.audio.currentTime = 0.0;
	}
}
