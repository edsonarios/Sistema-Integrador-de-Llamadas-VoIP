import { __decorate, __metadata } from "tslib";
import { Component, Input, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '@services/player.service';
import { interval, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
var AudioPlayerComponent = /** @class */ (function () {
    function AudioPlayerComponent(router, playerService) {
        var _this = this;
        this.router = router;
        this.playerService = playerService;
        this.valor = 0;
        this.track = this.playerService.random();
        this.createPlayer();
        var contador = interval(1000);
        var max = timer(11000);
        var example = contador.pipe(takeUntil(max));
        var subscribe = example.subscribe(function (n) { _this.valor = _this.getProgress(); });
        //this.valor=this.getProgress();
        //let value =  Math.floor(Math.random() * 100 + 1);
    }
    AudioPlayerComponent.prototype.actualiza = function () {
        this.valor = this.getProgress();
    };
    AudioPlayerComponent.prototype.createPlayer = function () {
        var _this = this;
        this.player = new Audio();
        this.player.onended = function () { return _this.next(); };
        this.setTrack();
    };
    AudioPlayerComponent.prototype.reload = function () {
        this.setTrack();
        this.player.play();
    };
    AudioPlayerComponent.prototype.setTrack = function () {
        this.player.src = this.track.url;
        this.player.load();
    };
    AudioPlayerComponent.prototype.ngOnDestroy = function () {
        this.player.pause();
        this.player.src = '';
        this.player.load();
    };
    AudioPlayerComponent.prototype.Play = function () {
        var _this = this;
        this.valor = 0;
        //Prueba en un intervalo de 10 segundos
        var contador = interval(1000);
        var max = timer(11000);
        var example = contador.pipe(takeUntil(max));
        var subscribe = example.subscribe(function (n) { _this.valor = _this.valor + 10; });
    };
    AudioPlayerComponent.prototype.prev = function () {
        if (!this.player.loop) {
            if (this.shuffle) {
                this.track = this.playerService.random();
            }
            else {
                this.track = this.playerService.prev();
            }
        }
        this.reload();
    };
    AudioPlayerComponent.prototype.next = function () {
        if (!this.player.loop) {
            if (this.shuffle) {
                this.track = this.playerService.random();
            }
            else {
                this.track = this.playerService.next();
            }
        }
        this.reload();
    };
    AudioPlayerComponent.prototype.playPause = function () {
        if (this.player.paused) {
            this.player.play();
        }
        else {
            this.player.pause();
        }
    };
    AudioPlayerComponent.prototype.toggleShuffle = function () {
        this.shuffle = !this.shuffle;
    };
    AudioPlayerComponent.prototype.toggleLoop = function () {
        this.player.loop = !this.player.loop;
    };
    AudioPlayerComponent.prototype.setVolume = function (volume) {
        this.player.volume = volume / 100;
    };
    AudioPlayerComponent.prototype.getVolume = function () {
        return this.player.volume * 100;
    };
    AudioPlayerComponent.prototype.setProgress = function (duration) {
        this.player.currentTime = this.player.duration * duration / 100;
    };
    AudioPlayerComponent.prototype.getProgress = function () {
        return this.player.currentTime / this.player.duration * 100 || 0;
    };
    __decorate([
        Input(),
        HostBinding('class.collapsed'),
        __metadata("design:type", Boolean)
    ], AudioPlayerComponent.prototype, "collapsed", void 0);
    AudioPlayerComponent = __decorate([
        Component({
            selector: 'audio-player',
            templateUrl: './audio_player.component.html'
        }),
        __metadata("design:paramtypes", [Router,
            PlayerService])
    ], AudioPlayerComponent);
    return AudioPlayerComponent;
}());
export { AudioPlayerComponent };
