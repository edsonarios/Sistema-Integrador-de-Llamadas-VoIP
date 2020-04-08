// const AUDIOS = require('./sonidos.json');
import * as AUDIOS from './sonidos.json';
var SoundPlayer = /** @class */ (function () {
    function SoundPlayer() {
        this.SOUNDS = new Map([
            ['ringback', { audio: new Audio(AUDIOS['ringback']), volume: 1.0 }],
            ['ringing', { audio: new Audio(AUDIOS['ringing']), volume: 1.0 }],
            ['answered', { audio: new Audio(AUDIOS['answered']), volume: 1.0 }],
            ['rejected', { audio: new Audio(AUDIOS['rejected']), volume: 0.5 }]
        ]);
        this.init = false;
        this.initialize();
    }
    SoundPlayer.prototype.initialize = function () {
        if (this.init)
            return;
        for (var _i = 0, _a = this.SOUNDS.values(); _i < _a.length; _i++) {
            var sound = _a[_i];
            sound.audio.volume = 0;
            try {
                sound.audio.play();
            }
            catch (error) { }
        }
        this.init = true;
    };
    SoundPlayer.prototype.play = function (name, relativeVolume) {
        if (relativeVolume === void 0) { relativeVolume = 1; }
        this.initialize();
        if (typeof relativeVolume !== 'number')
            relativeVolume = 1.0;
        var sound = this.SOUNDS.get(name);
        if (!sound)
            throw new Error("Nombre no encontrado \"" + name + "\"");
        try {
            sound.audio.pause();
            sound.audio.currentTime = 0.0;
            sound.audio.volume = (sound.volume || 1.0) * relativeVolume;
            sound.audio.play();
        }
        catch (err) {
            console.log('[ ERROR ]', err);
        }
    };
    SoundPlayer.prototype.stop = function (name) {
        var sound = this.SOUNDS.get(name);
        if (!sound)
            throw new Error("Nombre no encontrado \"" + name + "\"");
        sound.audio.pause();
        sound.audio.currentTime = 0.0;
    };
    return SoundPlayer;
}());
export { SoundPlayer };
