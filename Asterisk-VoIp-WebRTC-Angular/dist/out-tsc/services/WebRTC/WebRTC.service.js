import { __awaiter, __generator } from "tslib";
import { SoundPlayer } from './SoundPlayer';
import { config } from './config';
import { RTCConfig } from './RegisterRTC';
import { WebSocketInterface, UA } from 'jssip';
var WebRTCService = /** @class */ (function () {
    function WebRTCService() {
        this.sound = new SoundPlayer();
        this.status = false; // Verifica si estamos conectados
        this.audioLocal = document.getElementById('audio-local');
        this.audioRemote = document.getElementById('audio-remote');
        this.settings = new RTCConfig('7010', '7010', config.HOST);
        this.socket = new WebSocketInterface("wss://" + config.HOST + ":8089/ws");
        this.createSession();
        this.connect();
    }
    WebRTCService.prototype.createSession = function () {
        this.ua = new UA(this.settings.createConfig(this.socket));
    };
    WebRTCService.prototype.connect = function () {
        if (!this.ua.isRegistered()) {
            this.ua.start();
            this.ua.register();
        }
    };
    WebRTCService.prototype.disconnect = function () {
        if (this.ua.isRegistered()) {
            this.ua.stop();
            this.ua.unregister();
        }
    };
    WebRTCService.prototype.sessionEvents = function () {
        var _this = this;
        this.ua.on('connected', function (e) {
            console.log('[ CONECTADO ]', e);
            _this.msg = 'CONECTADO';
        });
        this.ua.on('disconnected', function (e) {
            console.log('[ DESCONECTADO ]', e);
            _this.msg = 'DESCONECTADO';
        });
        this.ua.on('registered', function (e) {
            console.log('[ REGISTRADO ]', e);
            _this.msg = 'REGISTRADO';
        });
        this.ua.on('unregistered', function (e) {
            console.log('[ NO REGISTRADO ]', e);
            _this.msg = 'NO REGISTRADO';
        });
        this.ua.on('registrationFailed', function (e) {
            console.log('[ NO REGISTRADO FALLANDO ]', e);
            _this.msg = 'NO REGISTRADO FALLANDO';
        });
        return this.msg;
    };
    WebRTCService.prototype.newRTCSession = function () {
        var _this = this;
        this.ua.on('newRTCSession', function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.session = data.session;
                        console.log('[ NEW RTC SESSION ]', data);
                        console.log('[ NEW RTC DATA ]', data.session.connection);
                        if (data.originator === 'local') {
                            console.log('LLAMADA LOCAL');
                        }
                        if (!(data.originator === 'remote')) return [3 /*break*/, 2];
                        console.log('LLAMADA REMOTA');
                        return [4 /*yield*/, this.sound.play('ringing')];
                    case 1:
                        _a.sent();
                        console.log(data.request.ruri);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        return this.session;
    };
    WebRTCService.prototype.terminate = function () {
        try {
            this.session.terminate();
        }
        catch (error) {
            console.warn(error);
        }
    };
    WebRTCService.prototype.mute = function () {
        try {
            this.session.mute();
        }
        catch (error) {
            console.warn(error);
        }
    };
    WebRTCService.prototype.unmute = function () {
        try {
            this.session.unmute();
        }
        catch (error) {
            console.warn(error);
        }
    };
    WebRTCService.prototype.remoteAnswer = function () {
        try {
            this.session.answer();
            var remoteStream = new MediaStream(this.session.connection.getReceivers().map(function (r) { return r.track; }));
            this.audioRemote.srcObject = remoteStream;
            this.audioLocal.play();
        }
        catch (error) {
            console.warn(error);
        }
    };
    WebRTCService.prototype.sipCall = function (sip) {
        var _this = this;
        var eventHandlers = {
            progress: function (e) {
                console.log('Llamada en progreso');
            },
            failed: function (e) {
                console.log('Llamada fallida');
            },
            ended: function (e) {
                console.log('Llamada terminada');
            },
            confirmed: function (e) {
                console.log('Llamada confirmada');
            }
        };
        var options = {
            eventHandlers: eventHandlers,
            mediaConstraints: {
                audio: true,
                video: false
            },
            pcConfig: {
                iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }]
            },
            rtcOfferConstraints: {
                offerToReceiveAudio: true,
                offerToReceiveVideo: false
            }
        };
        if (sip != '') {
            var session = this.ua.call("sip:" + sip + "@" + config.HOST, options);
            if (session) {
                session.connection.addEventListener('addstream', function (e) {
                    _this.audioLocal.srcObject = e.stream;
                    _this.audioLocal.play();
                });
            }
        }
    };
    WebRTCService.prototype.setSession = function (session) {
        this.session = session;
    };
    WebRTCService.prototype.getMessage = function () {
        return this.msg;
    };
    WebRTCService.prototype.getUA = function () {
        return this.ua;
    };
    return WebRTCService;
}());
export { WebRTCService };
