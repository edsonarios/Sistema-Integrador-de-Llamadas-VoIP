"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Extension = /** @class */ (function () {
    function Extension(context, exten, priority, app, appdata, usuarioId) {
        this.context = context;
        this.exten = exten;
        this.priority = priority;
        this.app = app;
        this.appdata = appdata;
        this.usuarioId = usuarioId;
    }
    return Extension;
}());
exports.Extension = Extension;
