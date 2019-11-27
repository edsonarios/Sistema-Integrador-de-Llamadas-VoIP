"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var AudioPlayerComponent = /** @class */ (function () {
    function AudioPlayerComponent(router) {
        this.router = router;
        this.valor = 0;
        //let value =  Math.floor(Math.random() * 100 + 1);
    }
    AudioPlayerComponent.prototype.ngOnInit = function () { };
    AudioPlayerComponent.prototype.Play = function () {
        var _this = this;
        var contador = rxjs_1.interval(1000);
        contador.subscribe(function (n) {
            if (_this.valor <= 100) {
                _this.valor = _this.valor + 10;
            }
            console.log('sigue dentro del intervalo');
        });
        // this.valor= (Math.random()*100+1);
        //console.log(this.valor);
    };
    AudioPlayerComponent = __decorate([
        core_1.Component({
            selector: 'audio-player',
            templateUrl: './audio_player.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], AudioPlayerComponent);
    return AudioPlayerComponent;
}());
exports.AudioPlayerComponent = AudioPlayerComponent;
